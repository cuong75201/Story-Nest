-- Add manually curated homepage slots to an existing Story Nest database.

BEGIN;

CREATE TABLE IF NOT EXISTS homepage_story_slots (
  slot VARCHAR(20) NOT NULL,
  position SMALLINT NOT NULL DEFAULT 1,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  selected_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (slot, position),
  UNIQUE (slot, story_id),
  CONSTRAINT homepage_story_slots_slot_check CHECK (slot IN ('HERO', 'EDITOR_PICK')),
  CONSTRAINT homepage_story_slots_position_positive CHECK (position > 0),
  CONSTRAINT homepage_story_slots_hero_position CHECK (slot <> 'HERO' OR position = 1)
);

DROP TRIGGER IF EXISTS homepage_story_slots_set_updated_at ON homepage_story_slots;
CREATE TRIGGER homepage_story_slots_set_updated_at
  BEFORE UPDATE ON homepage_story_slots
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;
