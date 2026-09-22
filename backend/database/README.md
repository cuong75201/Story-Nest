# Story Nest database

Schema PostgreSQL này được xây dựng từ `dac-ta-chuc-nang-he-thong-truyen.md`.

## Khởi tạo

### Docker (khuyến nghị cho môi trường phát triển)

Tại thư mục gốc dự án, tạo file `.env` từ `.env.example`, sau đó chạy:

```powershell
docker compose up -d
```

PostgreSQL sẽ chạy tại `localhost:5432` và tự chạy migration khi volume dữ liệu được tạo lần đầu. Kiểm tra trạng thái:

```powershell
docker compose ps
```

Migration `002_seed_sample_data.sql` cũng sẽ tự nạp dữ liệu demo: 4 tài khoản, 4 thể loại, 3 truyện, 5 chương và các tương tác mẫu. Các mật khẩu hash trong seed chỉ là dữ liệu minh họa, không dùng cho môi trường production.

## Kiểm tra kết nối từ backend

Cài dependencies và chạy API từ thư mục `backend`:

```powershell
.\venv\Scripts\python.exe -m pip install -r requirements.txt
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

Sau đó mở `http://127.0.0.1:8000/health/db`. Khi thành công, endpoint trả về database và user PostgreSQL; khi không kết nối được, trả về HTTP 503.

Để chạy lại migration từ đầu trong môi trường phát triển, dừng container và xóa volume (thao tác này xóa toàn bộ dữ liệu local):

```powershell
docker compose down -v
docker compose up -d
```

### PostgreSQL cài đặt sẵn

Tạo database PostgreSQL 15+ rồi chạy migration:

```powershell
psql "$env:DATABASE_URL" -f .\backend\database\migrations\001_initial_schema.sql
```

Ví dụ URL kết nối:

```text
postgresql://postgres:your-password@localhost:5432/story_nest
```

Migration tạo extension `pgcrypto` để sinh UUID, vì vậy tài khoản chạy migration cần quyền tạo extension (hoặc extension phải được bật sẵn).

## Quy ước dữ liệu chính

- `users.role` chỉ có `USER` và `ADMIN`; không có role `AUTHOR`. Quyền quản lý truyện được xác định qua `stories.owner_id`.
- `stories.visibility` tách riêng với `publication_status`: truyện có thể private/public và draft/published/hidden/removed.
- `chapters` dùng `chapter_number` duy nhất trong từng truyện, hỗ trợ sắp xếp chương.
- Các bảng follows, favorites và ratings dùng khóa chính ghép để ngăn người dùng tạo tương tác trùng lặp.
- `reading_progress` lưu điểm đọc mới nhất của mỗi người dùng trên từng truyện, phục vụ “Tiếp tục đọc”. `story_views` giữ lịch sử lượt xem cho thống kê.
- Trigger tự tạo notification cho người theo dõi khi một chương được xuất bản lần đầu.
- View `story_statistics` cung cấp số lượt xem, theo dõi, yêu thích, đánh giá và bình luận theo truyện.

Ứng dụng cần kiểm tra quyền sở hữu ở tầng truy vấn/API, ví dụ: `story.owner_id = current_user.id`; admin có thể thực hiện các thao tác kiểm duyệt phù hợp.
