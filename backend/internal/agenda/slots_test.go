package agenda

import (
	"testing"
	"time"

	"github.com/achadinhos/backend/internal/models"
)

var sp = mustLoad("America/Sao_Paulo")

func mustLoad(name string) *time.Location {
	loc, err := time.LoadLocation(name)
	if err != nil {
		panic(err)
	}
	return loc
}

func day(y int, m time.Month, d int) time.Time {
	return time.Date(y, m, d, 0, 0, 0, 0, sp)
}

func at(base time.Time, hm string) time.Time {
	d, ok := ParseHM(hm)
	if !ok {
		panic("bad hm: " + hm)
	}
	return base.Add(d)
}

func fmtAll(ts []time.Time) []string {
	out := make([]string, len(ts))
	for i, t := range ts {
		out[i] = t.Format("15:04")
	}
	return out
}

func assertSlots(t *testing.T, got []time.Time, want ...string) {
	t.Helper()
	gs := fmtAll(got)
	if len(gs) != len(want) {
		t.Fatalf("got %v, want %v", gs, want)
	}
	for i := range want {
		if gs[i] != want[i] {
			t.Fatalf("got %v, want %v", gs, want)
		}
	}
}

func TestDaySlotsFullFreeDay(t *testing.T) {
	d := day(2026, 7, 6) // segunda
	windows := []models.AgendaWindow{{Start: "09:00", End: "13:00"}}
	got := DaySlots(d, windows, time.Hour, 15*time.Minute, nil, d, d.AddDate(0, 0, 30))
	assertSlots(t, got, "09:00", "10:00", "11:00", "12:00")
}

func TestDaySlotsBusyRemovesConflicts(t *testing.T) {
	d := day(2026, 7, 6)
	windows := []models.AgendaWindow{{Start: "09:00", End: "13:00"}}
	// Ocupado 10:30–11:00. Com buffer de 15min o slot das 10:00 (termina 11:00,
	// +buffer 11:15 > 10:30) e o das 11:00 (começa 11:00, -buffer 10:45 < 11:00)
	// caem; 09:00 (termina 10:00, +buffer 10:15 < 10:30) e 12:00 sobrevivem.
	busy := []Busy{{Start: at(d, "10:30"), End: at(d, "11:00")}}
	got := DaySlots(d, windows, time.Hour, 15*time.Minute, busy, d, d.AddDate(0, 0, 30))
	assertSlots(t, got, "09:00", "12:00")
}

func TestDaySlotsZeroBufferAdjacentIsFine(t *testing.T) {
	d := day(2026, 7, 6)
	windows := []models.AgendaWindow{{Start: "09:00", End: "12:00"}}
	busy := []Busy{{Start: at(d, "10:00"), End: at(d, "11:00")}}
	got := DaySlots(d, windows, time.Hour, 0, busy, d, d.AddDate(0, 0, 30))
	assertSlots(t, got, "09:00", "11:00")
}

func TestDaySlotsLeadTimeAndHorizon(t *testing.T) {
	d := day(2026, 7, 6)
	windows := []models.AgendaWindow{{Start: "09:00", End: "18:00"}}
	notBefore := at(d, "11:30") // antecedência: primeiro slot >= 11:30
	notAfter := at(d, "14:00")  // horizonte: nada depois das 14:00
	got := DaySlots(d, windows, time.Hour, 15*time.Minute, nil, notBefore, notAfter)
	assertSlots(t, got, "12:00", "13:00", "14:00")
}

func TestDaySlotsEmptyWindowsMeansUnavailable(t *testing.T) {
	d := day(2026, 7, 5) // domingo
	got := DaySlots(d, nil, time.Hour, 15*time.Minute, nil, d, d.AddDate(0, 0, 30))
	if len(got) != 0 {
		t.Fatalf("expected no slots, got %v", fmtAll(got))
	}
}

func TestDaySlotsMultipleWindows(t *testing.T) {
	d := day(2026, 7, 6)
	windows := []models.AgendaWindow{
		{Start: "09:00", End: "11:00"},
		{Start: "14:00", End: "16:30"}, // 16:00 não cabe (terminaria 17:00)
	}
	got := DaySlots(d, windows, time.Hour, 15*time.Minute, nil, d, d.AddDate(0, 0, 30))
	assertSlots(t, got, "09:00", "10:00", "14:00", "15:00")
}

func TestDaySlotsIgnoresMalformedWindows(t *testing.T) {
	d := day(2026, 7, 6)
	windows := []models.AgendaWindow{
		{Start: "9h", End: "18:00"},    // formato inválido
		{Start: "15:00", End: "10:00"}, // fim antes do início
		{Start: "10:00", End: "12:00"},
	}
	got := DaySlots(d, windows, time.Hour, 0, nil, d, d.AddDate(0, 0, 30))
	assertSlots(t, got, "10:00", "11:00")
}

func TestDaySlotsBusyFromDifferentOffsetStillConflicts(t *testing.T) {
	d := day(2026, 7, 6)
	windows := []models.AgendaWindow{{Start: "09:00", End: "12:00"}}
	// Mesmo instante que 10:00–11:00 em São Paulo (-03), expresso em UTC.
	busy := []Busy{{
		Start: time.Date(2026, 7, 6, 13, 0, 0, 0, time.UTC),
		End:   time.Date(2026, 7, 6, 14, 0, 0, 0, time.UTC),
	}}
	got := DaySlots(d, windows, time.Hour, 0, busy, d, d.AddDate(0, 0, 30))
	assertSlots(t, got, "09:00", "11:00")
}
