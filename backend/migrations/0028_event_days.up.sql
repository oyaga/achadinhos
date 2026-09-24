-- Dias de um evento: um evento pode ocupar várias datas, cada uma com hora e
-- imagem próprias. events.event_date/event_time passam a espelhar o primeiro
-- dia (compat com clientes antigos e ordenação).
CREATE TABLE IF NOT EXISTS event_days (
    id uuid PRIMARY KEY,
    event_id uuid NOT NULL REFERENCES events (id) ON DELETE CASCADE,
    day date NOT NULL,
    day_time varchar(5) NOT NULL DEFAULT '',
    banner_url varchar(1000) NOT NULL DEFAULT '',
    created_at timestamptz,
    updated_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_event_days_event_id ON event_days (event_id);
CREATE INDEX IF NOT EXISTS idx_event_days_day ON event_days (day);

-- Backfill: cada evento existente vira um único dia (o fix também roda no
-- boot via db.EnsureEventDays, para instalações que só aplicam AutoMigrate).
INSERT INTO event_days (id, event_id, day, day_time, banner_url, created_at, updated_at)
SELECT gen_random_uuid(), e.id, e.event_date, e.event_time, '', now(), now()
FROM events e
WHERE NOT EXISTS (SELECT 1 FROM event_days d WHERE d.event_id = e.id);
