package agenda

import (
	"context"
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/achadinhos/backend/internal/models"
	"github.com/google/uuid"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	calendar "google.golang.org/api/calendar/v3"
	"google.golang.org/api/option"
	"gorm.io/gorm"
)

// Sentinel errors surfaced to handlers.
var (
	ErrNotConfigured = errors.New("google oauth not configured")
	ErrNotConnected  = errors.New("google account not connected")
	ErrBadState      = errors.New("invalid oauth state")
)

const stateTTL = 15 * time.Minute

// Service wraps the Google OAuth flow and Calendar operations for agendas.
// Tokens are persisted in google_oauth_tokens keyed by owner ("agenda:<slug>").
type Service struct {
	db           *gorm.DB
	clientID     string
	clientSecret string
	redirectURL  string
	stateSecret  []byte
}

// NewService builds the agenda Google service. redirectURL must be the full
// public callback URL ({APP_BASE_URL}/api/v1/agenda/google/callback).
// stateSecret signs the OAuth state parameter (CSRF protection).
func NewService(db *gorm.DB, clientID, clientSecret, redirectURL, stateSecret string) *Service {
	return &Service{
		db:           db,
		clientID:     clientID,
		clientSecret: clientSecret,
		redirectURL:  redirectURL,
		stateSecret:  []byte(stateSecret),
	}
}

// Configured reports whether the Google OAuth client credentials are set.
func (s *Service) Configured() bool { return s.clientID != "" && s.clientSecret != "" }

func (s *Service) oauthConfig() *oauth2.Config {
	return &oauth2.Config{
		ClientID:     s.clientID,
		ClientSecret: s.clientSecret,
		RedirectURL:  s.redirectURL,
		Endpoint:     google.Endpoint,
		Scopes: []string{
			"https://www.googleapis.com/auth/calendar.events",
			"https://www.googleapis.com/auth/calendar.freebusy",
		},
	}
}

// Owner returns the token owner key for an agenda slug.
func Owner(slug string) string { return "agenda:" + slug }

// ── OAuth state (HMAC-signed, stateless) ────────────────────────────────────

// signState creates a signed state carrying the slug, a timestamp and a nonce.
func (s *Service) signState(slug string) (string, error) {
	nonce := make([]byte, 8)
	if _, err := rand.Read(nonce); err != nil {
		return "", err
	}
	payload := slug + "|" + strconv.FormatInt(time.Now().Unix(), 10) + "|" + hex.EncodeToString(nonce)
	mac := hmac.New(sha256.New, s.stateSecret)
	mac.Write([]byte(payload))
	sig := hex.EncodeToString(mac.Sum(nil))
	return base64.RawURLEncoding.EncodeToString([]byte(payload + "|" + sig)), nil
}

// verifyState validates the signature and freshness of a state and returns the
// slug it was issued for.
func (s *Service) verifyState(state string) (string, error) {
	raw, err := base64.RawURLEncoding.DecodeString(state)
	if err != nil {
		return "", ErrBadState
	}
	parts := strings.Split(string(raw), "|")
	if len(parts) != 4 {
		return "", ErrBadState
	}
	slug, tsStr, nonce, sig := parts[0], parts[1], parts[2], parts[3]
	mac := hmac.New(sha256.New, s.stateSecret)
	mac.Write([]byte(slug + "|" + tsStr + "|" + nonce))
	want := hex.EncodeToString(mac.Sum(nil))
	if !hmac.Equal([]byte(want), []byte(sig)) {
		return "", ErrBadState
	}
	ts, err := strconv.ParseInt(tsStr, 10, 64)
	if err != nil || time.Since(time.Unix(ts, 0)) > stateTTL {
		return "", ErrBadState
	}
	return slug, nil
}

// AuthURL returns the Google consent URL for connecting the agenda's account.
func (s *Service) AuthURL(slug string) (string, error) {
	if !s.Configured() {
		return "", ErrNotConfigured
	}
	state, err := s.signState(slug)
	if err != nil {
		return "", err
	}
	return s.oauthConfig().AuthCodeURL(
		state,
		oauth2.AccessTypeOffline,
		oauth2.SetAuthURLParam("prompt", "consent"),
	), nil
}

// HandleCallback validates the state, exchanges the code and persists the
// tokens. Returns the slug the connection belongs to.
func (s *Service) HandleCallback(ctx context.Context, code, state string) (string, error) {
	if !s.Configured() {
		return "", ErrNotConfigured
	}
	slug, err := s.verifyState(state)
	if err != nil {
		return "", err
	}
	tok, err := s.oauthConfig().Exchange(ctx, code)
	if err != nil {
		return slug, fmt.Errorf("oauth exchange failed: %w", err)
	}
	if tok.RefreshToken == "" {
		// prompt=consent should always yield one; without it we cannot operate offline.
		return slug, errors.New("google did not return a refresh token")
	}

	owner := Owner(slug)
	rec := models.GoogleOAuthToken{
		Owner:        owner,
		RefreshToken: tok.RefreshToken,
		AccessToken:  tok.AccessToken,
		Expiry:       tok.Expiry,
	}
	err = s.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("owner = ?", owner).Delete(&models.GoogleOAuthToken{}).Error; err != nil {
			return err
		}
		return tx.Create(&rec).Error
	})
	if err != nil {
		return slug, fmt.Errorf("failed to persist token: %w", err)
	}
	return slug, nil
}

// Connected reports whether a refresh token exists for the owner.
func (s *Service) Connected(ctx context.Context, owner string) bool {
	var n int64
	s.db.WithContext(ctx).Model(&models.GoogleOAuthToken{}).
		Where("owner = ? AND refresh_token <> ''", owner).Count(&n)
	return n > 0
}

// Disconnect removes the stored tokens for the owner.
func (s *Service) Disconnect(ctx context.Context, owner string) error {
	return s.db.WithContext(ctx).Where("owner = ?", owner).
		Delete(&models.GoogleOAuthToken{}).Error
}

// ── Token source with persistence ────────────────────────────────────────────

// persistingSource wraps an oauth2.TokenSource and writes refreshed
// access tokens (and rotated refresh tokens) back to the database.
type persistingSource struct {
	db  *gorm.DB
	id  uuid.UUID
	src oauth2.TokenSource

	mu   sync.Mutex
	last string // last persisted access token
}

func (p *persistingSource) Token() (*oauth2.Token, error) {
	tok, err := p.src.Token()
	if err != nil {
		return nil, err
	}
	p.mu.Lock()
	defer p.mu.Unlock()
	if tok.AccessToken != p.last {
		p.last = tok.AccessToken
		updates := map[string]any{
			"access_token": tok.AccessToken,
			"expiry":       tok.Expiry,
		}
		if tok.RefreshToken != "" {
			updates["refresh_token"] = tok.RefreshToken
		}
		// Best-effort: a failed persist only costs an extra refresh later.
		_ = p.db.Model(&models.GoogleOAuthToken{}).
			Where("id = ?", p.id).Updates(updates).Error
	}
	return tok, nil
}

// calendarService builds an authenticated Calendar client for the owner,
// refreshing (and persisting) the access token as needed.
func (s *Service) calendarService(ctx context.Context, owner string) (*calendar.Service, error) {
	if !s.Configured() {
		return nil, ErrNotConfigured
	}
	var rec models.GoogleOAuthToken
	if err := s.db.WithContext(ctx).First(&rec, "owner = ?", owner).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrNotConnected
		}
		return nil, err
	}
	if rec.RefreshToken == "" {
		return nil, ErrNotConnected
	}
	base := s.oauthConfig().TokenSource(ctx, &oauth2.Token{
		AccessToken:  rec.AccessToken,
		RefreshToken: rec.RefreshToken,
		Expiry:       rec.Expiry,
		TokenType:    "Bearer",
	})
	ts := &persistingSource{db: s.db, id: rec.ID, src: base, last: rec.AccessToken}
	return calendar.NewService(ctx, option.WithTokenSource(oauth2.ReuseTokenSource(nil, ts)))
}

// FreeBusy returns the busy periods of the owner's primary calendar between
// from and to.
func (s *Service) FreeBusy(ctx context.Context, owner string, from, to time.Time) ([]Busy, error) {
	svc, err := s.calendarService(ctx, owner)
	if err != nil {
		return nil, err
	}
	res, err := svc.Freebusy.Query(&calendar.FreeBusyRequest{
		TimeMin: from.Format(time.RFC3339),
		TimeMax: to.Format(time.RFC3339),
		Items:   []*calendar.FreeBusyRequestItem{{Id: "primary"}},
	}).Context(ctx).Do()
	if err != nil {
		return nil, fmt.Errorf("freebusy query failed: %w", err)
	}
	cal, ok := res.Calendars["primary"]
	if !ok {
		return nil, errors.New("freebusy response missing primary calendar")
	}
	busy := make([]Busy, 0, len(cal.Busy))
	for _, b := range cal.Busy {
		start, err1 := time.Parse(time.RFC3339, b.Start)
		end, err2 := time.Parse(time.RFC3339, b.End)
		if err1 != nil || err2 != nil {
			continue
		}
		busy = append(busy, Busy{Start: start, End: end})
	}
	return busy, nil
}

// EventInput describes the booking to be created on the owner's calendar.
type EventInput struct {
	Summary     string
	Description string
	Start       time.Time
	End         time.Time
	Timezone    string
	Attendee    string // visitor e-mail
	Name        string // visitor display name
}

// CreatedEvent is the result of creating a booking on the owner's calendar.
type CreatedEvent struct {
	ID       string // Google Calendar event ID
	MeetLink string // Google Meet URL (may be empty)
}

// CreateEvent inserts the event on the primary calendar with a Google Meet
// conference and e-mail notifications, returning the created event's ID and
// Meet link.
func (s *Service) CreateEvent(ctx context.Context, owner string, in EventInput) (*CreatedEvent, error) {
	svc, err := s.calendarService(ctx, owner)
	if err != nil {
		return nil, err
	}
	ev := &calendar.Event{
		Summary:     in.Summary,
		Description: in.Description,
		Start:       &calendar.EventDateTime{DateTime: in.Start.Format(time.RFC3339), TimeZone: in.Timezone},
		End:         &calendar.EventDateTime{DateTime: in.End.Format(time.RFC3339), TimeZone: in.Timezone},
		Attendees: []*calendar.EventAttendee{
			{Email: in.Attendee, DisplayName: in.Name},
		},
		ConferenceData: &calendar.ConferenceData{
			CreateRequest: &calendar.CreateConferenceRequest{
				RequestId:             uuid.NewString(),
				ConferenceSolutionKey: &calendar.ConferenceSolutionKey{Type: "hangoutsMeet"},
			},
		},
	}
	created, err := svc.Events.Insert("primary", ev).
		ConferenceDataVersion(1).
		SendUpdates("all").
		Context(ctx).Do()
	if err != nil {
		return nil, fmt.Errorf("event insert failed: %w", err)
	}

	meet := created.HangoutLink
	if created.ConferenceData != nil {
		for _, ep := range created.ConferenceData.EntryPoints {
			if ep.EntryPointType == "video" && ep.Uri != "" {
				meet = ep.Uri
				break
			}
		}
	}
	return &CreatedEvent{ID: created.Id, MeetLink: meet}, nil
}
