-- Mark one genre as the primary genre for each story.

BEGIN;

ALTER TABLE story_genres
  ADD COLUMN IF NOT EXISTS is_primary BOOLEAN NOT NULL DEFAULT FALSE;

-- Existing stories did not record genre priority. Select one deterministic
-- primary genre only for stories that do not already have one.
WITH ranked_genres AS (
  SELECT
    sg.story_id,
    sg.genre_id,
    row_number() OVER (
      PARTITION BY sg.story_id
      ORDER BY sg.genre_id
    ) AS genre_rank
  FROM story_genres sg
  WHERE NOT EXISTS (
    SELECT 1
    FROM story_genres primary_genre
    WHERE primary_genre.story_id = sg.story_id
      AND primary_genre.is_primary = TRUE
  )
)
UPDATE story_genres sg
SET is_primary = TRUE
FROM ranked_genres ranked
WHERE sg.story_id = ranked.story_id
  AND sg.genre_id = ranked.genre_id
  AND ranked.genre_rank = 1;

CREATE UNIQUE INDEX IF NOT EXISTS story_genres_one_primary_per_story
  ON story_genres (story_id)
  WHERE is_primary = TRUE;

COMMIT;
