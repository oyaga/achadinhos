// Package agenda implements the booking feature: availability (slot)
// computation from work-hour windows plus Google Calendar busy periods, and
// the Google OAuth/Calendar integration used to create events with Meet links.
package agenda

import (
	"sort"
	"time"

	"github.com/achadinhos/backend/internal/models"
)

// Busy is an occupied period (usually sourced from the Google FreeBusy API).
type Busy struct {
	Start time.Time
	End   time.Time
}

// ParseHM parses an "HH:MM" string into an offset from midnight. ok is false
// for malformed values.
func ParseHM(s string) (time.Duration, bool) {
	t, err := time.Parse("15:04", s)
	if err != nil {
		return 0, false
	}
	return time.Duration(t.Hour())*time.Hour + time.Duration(t.Minute())*time.Minute, true
}

// DaySlots computes the available slot start times for a single day.
//
//   - dayStart: midnight of the target day in the agenda's timezone.
//   - windows: the work-hour windows for that weekday ("09:00"–"18:00", ...).
//   - duration: slot length; candidates are generated every `duration` from the
//     window start and must end within the window.
//   - buffer: required gap between a slot and any busy period.
//   - busy: occupied periods; a slot conflicting with any of them (buffer
//     included) is discarded.
//   - notBefore / notAfter: lead-time and horizon bounds — slots starting
//     before notBefore or after notAfter are discarded.
//
// The function is pure: no clock, no I/O. Results are sorted and de-duplicated.
func DaySlots(dayStart time.Time, windows []models.AgendaWindow, duration, buffer time.Duration, busy []Busy, notBefore, notAfter time.Time) []time.Time {
	if duration <= 0 {
		return nil
	}
	var out []time.Time
	seen := make(map[int64]bool)
	for _, w := range windows {
		ws, ok1 := ParseHM(w.Start)
		we, ok2 := ParseHM(w.End)
		if !ok1 || !ok2 || we <= ws {
			continue
		}
		winStart := dayStart.Add(ws)
		winEnd := dayStart.Add(we)
		for s := winStart; !s.Add(duration).After(winEnd); s = s.Add(duration) {
			if s.Before(notBefore) || s.After(notAfter) {
				continue
			}
			if conflicts(s, s.Add(duration), buffer, busy) {
				continue
			}
			if key := s.Unix(); !seen[key] {
				seen[key] = true
				out = append(out, s)
			}
		}
	}
	sort.Slice(out, func(i, j int) bool { return out[i].Before(out[j]) })
	return out
}

// conflicts reports whether the slot [start, end), padded by buffer on both
// sides, overlaps any busy period.
func conflicts(start, end time.Time, buffer time.Duration, busy []Busy) bool {
	for _, b := range busy {
		if start.Add(-buffer).Before(b.End) && end.Add(buffer).After(b.Start) {
			return true
		}
	}
	return false
}
