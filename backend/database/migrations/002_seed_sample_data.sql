-- Story Nest sample data. This file is loaded after 001_initial_schema.sql by Docker.
-- All fixed UUIDs make the seed safe to run again on the same database.

BEGIN;

INSERT INTO users (id, email, username, password_hash, display_name, bio, role, status, email_verified_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@storynest.local', 'admin', '$2b$12$seedDataOnlyNotForProductionPasswordHash000000000000000000000', 'Quản trị viên', 'Tài khoản quản trị dữ liệu mẫu.', 'ADMIN', 'ACTIVE', now()),
  ('00000000-0000-0000-0000-000000000002', 'minh@storynest.local', 'minhnguyen', '$2b$12$seedDataOnlyNotForProductionPasswordHash000000000000000000000', 'Minh Nguyễn', 'Thích viết truyện phiêu lưu và kỳ ảo.', 'USER', 'ACTIVE', now()),
  ('00000000-0000-0000-0000-000000000003', 'linh@storynest.local', 'linhtran', '$2b$12$seedDataOnlyNotForProductionPasswordHash000000000000000000000', 'Linh Trần', 'Độc giả và người kể những câu chuyện nhỏ.', 'USER', 'ACTIVE', now()),
  ('00000000-0000-0000-0000-000000000004', 'nam@storynest.local', 'namle', '$2b$12$seedDataOnlyNotForProductionPasswordHash000000000000000000000', 'Nam Lê', 'Yêu khoa học viễn tưởng.', 'USER', 'ACTIVE', now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO genres (id, name, slug, description)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'Kỳ ảo', 'ky-ao', 'Thế giới phép thuật và những điều kỳ diệu.'),
  ('10000000-0000-0000-0000-000000000002', 'Phiêu lưu', 'phieu-luu', 'Những hành trình khám phá.'),
  ('10000000-0000-0000-0000-000000000003', 'Khoa học viễn tưởng', 'khoa-hoc-vien-tuong', 'Công nghệ và tương lai.'),
  ('10000000-0000-0000-0000-000000000004', 'Lãng mạn', 'lang-man', 'Những câu chuyện về tình yêu.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO stories (id, owner_id, title, slug, summary, visibility, state, publication_status, published_at)
VALUES
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Hành Trình Qua Rừng Sao', 'hanh-trinh-qua-rung-sao', 'Linh An bước vào khu rừng nơi những vì sao rơi xuống mỗi đêm.', 'PUBLIC', 'ONGOING', 'PUBLISHED', now() - interval '30 days'),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'Những Lá Thư Chưa Gửi', 'nhung-la-thu-chua-gui', 'Bản thảo riêng về những ký ức tuổi trẻ.', 'PRIVATE', 'DRAFT', 'DRAFT', NULL),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', 'Trạm Cuối Sao Hỏa', 'tram-cuoi-sao-hoa', 'Một nhóm thám hiểm tìm cách trở về Trái Đất.', 'PUBLIC', 'COMPLETED', 'PUBLISHED', now() - interval '90 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO story_genres (story_id, genre_id)
VALUES
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003')
ON CONFLICT DO NOTHING;

INSERT INTO chapters (id, story_id, title, content, chapter_number, publication_status, published_at)
VALUES
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Chương 1: Ánh sáng đầu tiên', 'Linh An nhìn thấy một ngôi sao rơi ngay sau khu rừng.', 1, 'PUBLISHED', now() - interval '30 days'),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'Chương 2: Con đường phát sáng', 'Con đường dưới chân cô bỗng lấp lánh ánh bạc.', 2, 'PUBLISHED', now() - interval '7 days'),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'Chương 1: Bức thư xanh', 'Đây là chương nháp chưa công bố.', 1, 'DRAFT', NULL),
  ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000003', 'Chương 1: Tín hiệu', 'Tín hiệu lạ được thu từ phía bên kia Sao Hỏa.', 1, 'PUBLISHED', now() - interval '90 days'),
  ('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000003', 'Chương 2: Trở về', 'Phi hành đoàn bắt đầu hành trình trở về nhà.', 2, 'PUBLISHED', now() - interval '60 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_follows (follower_id, following_id)
VALUES ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002')
ON CONFLICT DO NOTHING;

INSERT INTO story_follows (user_id, story_id)
VALUES
  ('00000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;

INSERT INTO story_favorites (user_id, story_id)
VALUES ('00000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;

INSERT INTO reading_progress (user_id, story_id, chapter_id, position, last_read_at)
VALUES ('00000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 126, now() - interval '1 hour')
ON CONFLICT (user_id, story_id) DO UPDATE
SET chapter_id = EXCLUDED.chapter_id, position = EXCLUDED.position, last_read_at = EXCLUDED.last_read_at;

INSERT INTO story_views (id, story_id, chapter_id, user_id, viewed_at)
VALUES
  ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', now() - interval '2 days'),
  ('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;

INSERT INTO comments (id, author_id, story_id, body, status)
VALUES ('50000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 'Mở đầu rất cuốn hút, mình chờ chương tiếp theo!', 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

INSERT INTO comments (id, author_id, story_id, parent_id, body, status)
VALUES ('50000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001', 'Cảm ơn bạn, chương mới sẽ sớm ra mắt!', 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ratings (user_id, story_id, score, review)
VALUES ('00000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 5, 'Thế giới truyện rất thú vị.')
ON CONFLICT (user_id, story_id) DO UPDATE SET score = EXCLUDED.score, review = EXCLUDED.review;

INSERT INTO notifications (id, recipient_id, actor_id, type, title, body, data)
VALUES
  ('60000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'NEW_CHAPTER', 'Chương mới: Con đường phát sáng', 'Hành Trình Qua Rừng Sao vừa có chương mới.', '{"story_id":"20000000-0000-0000-0000-000000000001","chapter_id":"30000000-0000-0000-0000-000000000002"}'),
  ('60000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'NEW_FOLLOWER', 'Bạn có người theo dõi mới', 'Linh Trần đã theo dõi bạn.', '{}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO reports (id, reporter_id, comment_id, reason, details, status, handled_by, resolution_note, handled_at)
VALUES ('70000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000004', '50000000-0000-0000-0000-000000000001', 'SPAM', 'Báo cáo mẫu để kiểm tra giao diện quản trị.', 'RESOLVED', '00000000-0000-0000-0000-000000000001', 'Không phát hiện vi phạm.', now() - interval '12 hours')
ON CONFLICT (id) DO NOTHING;

COMMIT;
