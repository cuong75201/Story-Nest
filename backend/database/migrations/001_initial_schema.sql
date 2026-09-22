-- Story Nest - PostgreSQL initial schema
-- Run once on an empty database: psql "$DATABASE_URL" -f backend/database/migrations/001_initial_schema.sql

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');
CREATE TYPE account_status AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');
CREATE TYPE visibility AS ENUM ('PUBLIC', 'PRIVATE');
CREATE TYPE story_state AS ENUM ('DRAFT', 'ONGOING', 'COMPLETED', 'HIATUS');
CREATE TYPE publication_status AS ENUM ('DRAFT', 'PUBLISHED', 'HIDDEN', 'REMOVED');
CREATE TYPE comment_status AS ENUM ('ACTIVE', 'HIDDEN', 'REMOVED');
CREATE TYPE report_status AS ENUM ('PENDING', 'REVIEWING', 'RESOLVED', 'DISMISSED');
CREATE TYPE notification_type AS ENUM (
  'NEW_CHAPTER', 'STORY_UPDATED', 'NEW_FOLLOWER', 'COMMENT', 'REPORT_RESOLVED', 'SYSTEM'
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(320) NOT NULL UNIQUE,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  role user_role NOT NULL DEFAULT 'USER',
  status account_status NOT NULL DEFAULT 'ACTIVE',
  email_verified_at TIMESTAMPTZ,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT users_email_normalized CHECK (email = lower(email)),
  CONSTRAINT users_username_format CHECK (username ~ '^[a-zA-Z0-9_]{3,50}$')
);

CREATE TABLE genres (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(80) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(350) NOT NULL UNIQUE,
  summary TEXT,
  cover_image_url TEXT,
  visibility visibility NOT NULL DEFAULT 'PRIVATE',
  state story_state NOT NULL DEFAULT 'DRAFT',
  publication_status publication_status NOT NULL DEFAULT 'DRAFT',
  published_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  search_vector TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(summary, ''))
  ) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT stories_title_not_blank CHECK (btrim(title) <> ''),
  CONSTRAINT stories_published_date CHECK (
    (publication_status = 'PUBLISHED' AND published_at IS NOT NULL) OR publication_status <> 'PUBLISHED'
  )
);

CREATE TABLE story_genres (
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  genre_id UUID NOT NULL REFERENCES genres(id) ON DELETE RESTRICT,
  PRIMARY KEY (story_id, genre_id)
);

CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  title VARCHAR(300) NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  chapter_number INTEGER NOT NULL,
  publication_status publication_status NOT NULL DEFAULT 'DRAFT',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chapters_number_positive CHECK (chapter_number > 0),
  CONSTRAINT chapters_title_not_blank CHECK (btrim(title) <> ''),
  CONSTRAINT chapters_published_date CHECK (
    (publication_status = 'PUBLISHED' AND published_at IS NOT NULL) OR publication_status <> 'PUBLISHED'
  ),
  UNIQUE (story_id, chapter_number)
);

CREATE TABLE story_follows (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, story_id)
);

CREATE TABLE story_favorites (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, story_id)
);

CREATE TABLE user_follows (
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, following_id),
  CONSTRAINT user_follows_no_self_follow CHECK (follower_id <> following_id)
);

-- One row is the latest reading position for a user in a story ("continue reading").
CREATE TABLE reading_progress (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  last_read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, story_id),
  CONSTRAINT reading_progress_position_nonnegative CHECK (position >= 0)
);

CREATE TABLE story_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES chapters(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  status comment_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT comments_one_target CHECK (num_nonnulls(story_id, chapter_id) = 1),
  CONSTRAINT comments_body_not_blank CHECK (btrim(body) <> '')
);

CREATE TABLE ratings (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  score SMALLINT NOT NULL,
  review TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, story_id),
  CONSTRAINT ratings_score_range CHECK (score BETWEEN 1 AND 5)
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  type notification_type NOT NULL,
  title VARCHAR(300) NOT NULL,
  body TEXT,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  reason VARCHAR(100) NOT NULL,
  details TEXT,
  status report_status NOT NULL DEFAULT 'PENDING',
  handled_by UUID REFERENCES users(id) ON DELETE SET NULL,
  resolution_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  handled_at TIMESTAMPTZ,
  CONSTRAINT reports_one_target CHECK (num_nonnulls(story_id, chapter_id, comment_id) = 1)
);

CREATE INDEX stories_owner_idx ON stories(owner_id);
CREATE INDEX stories_discovery_idx ON stories(visibility, publication_status, state, published_at DESC)
  WHERE deleted_at IS NULL;
CREATE INDEX stories_search_idx ON stories USING GIN(search_vector);
CREATE INDEX chapters_story_published_idx ON chapters(story_id, publication_status, chapter_number);
CREATE INDEX reading_progress_continue_idx ON reading_progress(user_id, last_read_at DESC);
CREATE INDEX story_views_story_idx ON story_views(story_id, viewed_at DESC);
CREATE INDEX comments_story_idx ON comments(story_id, created_at DESC) WHERE status = 'ACTIVE';
CREATE INDEX comments_chapter_idx ON comments(chapter_id, created_at DESC) WHERE status = 'ACTIVE';
CREATE INDEX notifications_unread_idx ON notifications(recipient_id, created_at DESC) WHERE read_at IS NULL;
CREATE INDEX reports_pending_idx ON reports(status, created_at) WHERE status IN ('PENDING', 'REVIEWING');

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION publish_chapter_notifications() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.publication_status = 'PUBLISHED'
     AND (TG_OP = 'INSERT' OR OLD.publication_status IS DISTINCT FROM 'PUBLISHED') THEN
    INSERT INTO notifications (recipient_id, actor_id, type, title, body, data)
    SELECT sf.user_id, s.owner_id, 'NEW_CHAPTER',
           'Chương mới: ' || NEW.title,
           s.title,
           jsonb_build_object('story_id', s.id, 'chapter_id', NEW.id)
    FROM story_follows sf
    JOIN stories s ON s.id = NEW.story_id
    WHERE sf.story_id = NEW.story_id AND sf.user_id <> s.owner_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_set_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER genres_set_updated_at BEFORE UPDATE ON genres FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER stories_set_updated_at BEFORE UPDATE ON stories FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER chapters_set_updated_at BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER comments_set_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER ratings_set_updated_at BEFORE UPDATE ON ratings FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER chapters_notify_followers
  AFTER INSERT OR UPDATE OF publication_status ON chapters
  FOR EACH ROW EXECUTE FUNCTION publish_chapter_notifications();

-- Read-only aggregation for the owner's story dashboard and discovery ranking.
CREATE VIEW story_statistics AS
SELECT s.id AS story_id,
       (SELECT count(*) FROM story_views sv WHERE sv.story_id = s.id) AS view_count,
       (SELECT count(*) FROM story_follows sf WHERE sf.story_id = s.id) AS follower_count,
       (SELECT count(*) FROM story_favorites fav WHERE fav.story_id = s.id) AS favorite_count,
       (SELECT count(*) FROM ratings r WHERE r.story_id = s.id) AS rating_count,
       (SELECT round(avg(r.score), 2) FROM ratings r WHERE r.story_id = s.id) AS average_rating,
       (SELECT count(*) FROM comments c WHERE c.story_id = s.id AND c.status = 'ACTIVE') AS comment_count
FROM stories s;

COMMIT;
