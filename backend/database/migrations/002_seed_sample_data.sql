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

-- Additional public stories for homepage hero, sidebar, and trending sections.
INSERT INTO stories (id, owner_id, title, slug, summary, cover_image_url, visibility, state, publication_status, published_at)
VALUES
  ('20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000003', 'Tiệm Sách Mở Lối Lúc Nửa Đêm', 'tiem-sach-mo-loi-luc-nua-dem', 'Mỗi cuốn sách trong tiệm đều dẫn người đọc đến một ký ức đã bị lãng quên.', 'https://picsum.photos/seed/story-nest-bookshop/600/900', 'PUBLIC', 'ONGOING', 'PUBLISHED', now() - interval '12 days'),
  ('20000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 'Mùa Hè Trên Ban Công', 'mua-he-tren-ban-cong', 'Hai người hàng xóm bắt đầu trò chuyện qua những chậu hoa trên ban công.', 'https://picsum.photos/seed/story-nest-summer/600/900', 'PUBLIC', 'COMPLETED', 'PUBLISHED', now() - interval '45 days'),
  ('20000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000004', 'Thành Phố Dưới Lòng Đất', 'thanh-pho-duoi-long-dat', 'Một kỹ sư trẻ phát hiện thành phố bí mật vận hành bằng năng lượng của Trái Đất.', 'https://picsum.photos/seed/story-nest-underground/600/900', 'PUBLIC', 'ONGOING', 'PUBLISHED', now() - interval '20 days'),
  ('20000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000002', 'Người Gác Hải Đăng', 'nguoi-gac-hai-dang', 'Ngọn hải đăng cuối cùng cất giữ tín hiệu của những con tàu đã biến mất.', 'https://picsum.photos/seed/story-nest-lighthouse/600/900', 'PUBLIC', 'ONGOING', 'PUBLISHED', now() - interval '8 days'),
  ('20000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000003', 'Bức Tranh Không Có Bóng', 'buc-tranh-khong-co-bong', 'Một họa sĩ phát hiện các nhân vật trong tranh của mình đang sống một cuộc đời khác.', 'https://picsum.photos/seed/story-nest-painting/600/900', 'PUBLIC', 'COMPLETED', 'PUBLISHED', now() - interval '60 days'),
  ('20000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000004', 'Chuyến Tàu Đến Ngày Mai', 'chuyen-tau-den-ngay-mai', 'Chuyến tàu xuyên thời gian buộc mỗi hành khách phải lựa chọn một tương lai.', 'https://picsum.photos/seed/story-nest-train/600/900', 'PUBLIC', 'ONGOING', 'PUBLISHED', now() - interval '5 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO homepage_story_slots (slot, position, story_id, selected_by)
VALUES
  ('HERO', 1, '20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001'),
  ('EDITOR_PICK', 1, '20000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001'),
  ('EDITOR_PICK', 2, '20000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000001'),
  ('EDITOR_PICK', 3, '20000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000001')
ON CONFLICT (slot, position) DO UPDATE SET
  story_id = EXCLUDED.story_id,
  selected_by = EXCLUDED.selected_by,
  updated_at = now();

INSERT INTO story_genres (story_id, genre_id, is_primary)
VALUES
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', TRUE),
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', FALSE),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO story_genres (story_id, genre_id, is_primary)
VALUES
  ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', TRUE),
  ('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000004', TRUE),
  ('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000002', TRUE),
  ('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000003', FALSE),
  ('20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000001', TRUE),
  ('20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000002', FALSE),
  ('20000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000001', TRUE),
  ('20000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000003', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO chapters (id, story_id, title, content, chapter_number, publication_status, published_at)
VALUES
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Chương 1: Ánh sáng đầu tiên', 'Linh An nhìn thấy một ngôi sao rơi ngay sau khu rừng.', 1, 'PUBLISHED', now() - interval '30 days'),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'Chương 2: Con đường phát sáng', 'Con đường dưới chân cô bỗng lấp lánh ánh bạc.', 2, 'PUBLISHED', now() - interval '7 days'),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'Chương 1: Bức thư xanh', 'Đây là chương nháp chưa công bố.', 1, 'DRAFT', NULL),
  ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000003', 'Chương 1: Tín hiệu', 'Tín hiệu lạ được thu từ phía bên kia Sao Hỏa.', 1, 'PUBLISHED', now() - interval '90 days'),
  ('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000003', 'Chương 2: Trở về', 'Phi hành đoàn bắt đầu hành trình trở về nhà.', 2, 'PUBLISHED', now() - interval '60 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO chapters (id, story_id, title, content, chapter_number, publication_status, published_at)
VALUES
  ('30000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000004', 'Chương 1: Cánh Cửa Màu Lam', 'Cánh cửa sau giá sách chợt phát sáng khi kim đồng hồ chạm mốc mười hai giờ.', 1, 'PUBLISHED', now() - interval '12 days'),
  ('30000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000004', 'Chương 2: Cuốn Sách Không Tên', 'Trang đầu tiên của cuốn sách viết chính xác tên của người đang cầm nó.', 2, 'PUBLISHED', now() - interval '1 day'),
  ('30000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000005', 'Chương 1: Chậu Hoa Đầu Tiên', 'Một mảnh giấy gắn trên chậu hoa bắt đầu cuộc trò chuyện giữa hai ban công.', 1, 'PUBLISHED', now() - interval '45 days'),
  ('30000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000006', 'Chương 1: Đường Hầm Số 0', 'Bản vẽ của đường hầm không tồn tại xuất hiện trong một hồ sơ cũ.', 1, 'PUBLISHED', now() - interval '20 days'),
  ('30000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000006', 'Chương 2: Những Cư Dân Đầu Tiên', 'Đội khảo sát nghe thấy tiếng chuông vọng lên từ bên dưới.', 2, 'PUBLISHED', now() - interval '3 days'),
  ('30000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000007', 'Chương 1: Đêm Sương', 'Người gác mới nhận được một tín hiệu không có trong hệ thống.', 1, 'PUBLISHED', now() - interval '8 days'),
  ('30000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000008', 'Chương 1: Phòng Tranh Đóng Cửa', 'Một chiếc bóng biến mất khỏi bức tranh trước ngày triển lãm.', 1, 'PUBLISHED', now() - interval '60 days'),
  ('30000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000009', 'Chương 1: Vé Một Chiều', 'Trên tấm vé chỉ in điểm đến, không có ngày quay về.', 1, 'PUBLISHED', now() - interval '5 days'),
  ('30000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000009', 'Chương 2: Toa Tàu Số 7', 'Những hành khách trên toa số 7 đều nhớ về cùng một ngày chưa từng xảy ra.', 2, 'PUBLISHED', now() - interval '6 hours')
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

INSERT INTO story_follows (user_id, story_id)
VALUES
  ('00000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000004'),
  ('00000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004'),
  ('00000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000006'),
  ('00000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000007'),
  ('00000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000009')
ON CONFLICT DO NOTHING;

INSERT INTO story_favorites (user_id, story_id)
VALUES
  ('00000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000004'),
  ('00000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004'),
  ('00000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000006'),
  ('00000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000009')
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

-- Recent views deliberately have different counts so trending queries have meaningful data.
INSERT INTO story_views (id, story_id, chapter_id, user_id, viewed_at)
VALUES
  ('40000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', now() - interval '6 days'),
  ('40000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000004', now() - interval '3 days'),
  ('40000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000002', now() - interval '1 day'),
  ('40000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000007', NULL, now() - interval '8 hours'),
  ('40000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000004', now() - interval '2 hours'),
  ('40000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000009', '30000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000002', now() - interval '4 days'),
  ('40000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000009', '30000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000003', now() - interval '2 days'),
  ('40000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000009', '30000000-0000-0000-0000-000000000014', NULL, now() - interval '12 hours'),
  ('40000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000009', '30000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000002', now() - interval '1 hour'),
  ('40000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000002', now() - interval '5 days'),
  ('40000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000003', now() - interval '2 days'),
  ('40000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000010', NULL, now() - interval '18 hours'),
  ('40000000-0000-0000-0000-000000000015', '20000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000003', now() - interval '3 days'),
  ('40000000-0000-0000-0000-000000000016', '20000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000004', now() - interval '1 day'),
  ('40000000-0000-0000-0000-000000000017', '20000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000003', now() - interval '4 days'),
  ('40000000-0000-0000-0000-000000000018', '20000000-0000-0000-0000-000000000008', '30000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000004', now() - interval '8 days')
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

INSERT INTO ratings (user_id, story_id, score, review)
VALUES
  ('00000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000004', 5, 'Không khí bí ẩn và cách kể chuyện rất cuốn hút.'),
  ('00000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004', 4, 'Ý tưởng về tiệm sách rất thú vị.'),
  ('00000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000006', 5, 'Thế giới dưới lòng đất được xây dựng hấp dẫn.'),
  ('00000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000007', 4, 'Bầu không khí biển đêm rất ấn tượng.'),
  ('00000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000009', 5, 'Mở đầu nhanh và có nhiều bất ngờ.')
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
