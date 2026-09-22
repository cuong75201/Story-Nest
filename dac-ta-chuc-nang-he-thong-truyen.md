# BẢNG ĐẶC TẢ CHỨC NĂNG HỆ THỐNG TRUYỆN

## 1. Tổng quan

Hệ thống cho phép mỗi **Người dùng** vừa là người đọc vừa có khả năng sáng tác và xuất bản truyện. Không tồn tại vai trò **Tác giả** riêng biệt.

Người dùng có thể tạo truyện, lưu bản nháp, quản lý chương, xuất bản truyện ở chế độ công khai hoặc riêng tư. Đồng thời, người dùng có thể đọc, theo dõi, yêu thích, bình luận và đánh giá truyện của người dùng khác.

Đối với truyện do chính mình tạo, người dùng có quyền quản lý nội dung dựa trên **quyền sở hữu truyện**.

---

## 2. Bảng đặc tả chức năng

| Mã | Chức năng | Tác nhân | Mô tả | Đầu vào | Kết quả |
|---|---|---|---|---|---|
| F01 | Đăng ký tài khoản | Khách | Tạo tài khoản mới để sử dụng hệ thống | Email, tên đăng nhập, mật khẩu | Tài khoản được tạo |
| F02 | Đăng nhập | Khách | Xác thực để truy cập tài khoản | Email/tên đăng nhập, mật khẩu | Đăng nhập thành công |
| F03 | Quản lý hồ sơ | Người dùng | Xem và chỉnh sửa tên, ảnh đại diện, giới thiệu cá nhân... | Thông tin cá nhân | Hồ sơ được cập nhật |
| F04 | Tạo truyện | Người dùng | Tạo truyện mới với tên, mô tả, ảnh bìa, thể loại... | Thông tin truyện | Truyện mới được tạo |
| F05 | Lưu bản nháp | Người dùng | Lưu truyện hoặc chương đang viết nhưng chưa muốn công bố | Nội dung truyện/chương | Bản nháp được lưu |
| F06 | Chỉnh sửa truyện | Người dùng | Chỉnh sửa thông tin của truyện do chính người dùng tạo | Thông tin cần chỉnh sửa | Truyện được cập nhật |
| F07 | Quản lý chương | Người dùng | Thêm, sửa, xóa và sắp xếp các chương của truyện do mình tạo | Nội dung chương | Danh sách chương được cập nhật |
| F08 | Xuất bản truyện/chương | Người dùng | Công bố truyện hoặc chương đã hoàn thành | Truyện/chương | Nội dung được xuất bản |
| F09 | Thiết lập quyền riêng tư | Người dùng | Đặt truyện ở trạng thái công khai hoặc riêng tư | Public/Private | Quyền truy cập được cập nhật |
| F10 | Quản lý trạng thái truyện | Người dùng | Thiết lập trạng thái đang tiến hành, hoàn thành hoặc tạm dừng | Trạng thái | Trạng thái truyện được cập nhật |
| F11 | Xóa truyện | Người dùng | Xóa truyện do chính người dùng tạo | Truyện cần xóa | Truyện được xóa/ẩn |
| F12 | Đọc truyện | Khách/Người dùng | Đọc các truyện và chương công khai trên hệ thống | Truyện, chương | Nội dung được hiển thị |
| F13 | Tìm kiếm truyện | Khách/Người dùng | Tìm truyện theo tên, tác giả hoặc từ khóa | Từ khóa tìm kiếm | Danh sách truyện phù hợp |
| F14 | Lọc truyện | Khách/Người dùng | Lọc truyện theo thể loại, trạng thái, thời gian phát hành... | Điều kiện lọc | Danh sách truyện phù hợp |
| F15 | Sắp xếp truyện | Khách/Người dùng | Sắp xếp theo ngày ra mắt, mới cập nhật, lượt xem, lượt theo dõi... | Tiêu chí sắp xếp | Danh sách được sắp xếp |
| F16 | Xem truyện hot | Khách/Người dùng | Hiển thị các truyện nổi bật dựa trên dữ liệu tương tác | Lượt đọc, yêu thích, theo dõi... | Danh sách truyện hot |
| F17 | Theo dõi truyện | Người dùng | Theo dõi truyện để nhận thông tin khi có nội dung mới | Truyện cần theo dõi | Truyện được thêm vào danh sách theo dõi |
| F18 | Quản lý kho yêu thích | Người dùng | Thêm hoặc xóa truyện khỏi danh sách yêu thích | Truyện được chọn | Kho yêu thích được cập nhật |
| F19 | Lịch sử đọc | Người dùng | Lưu các truyện và chương mà người dùng đã đọc | Hoạt động đọc | Lịch sử đọc được lưu |
| F20 | Tiếp tục đọc | Người dùng | Mở lại chương/vị trí mà người dùng đọc gần nhất | Lịch sử đọc | Nội dung gần nhất được mở |
| F21 | Bình luận | Người dùng | Đăng, sửa hoặc xóa bình luận của mình tại truyện/chương | Nội dung bình luận | Bình luận được cập nhật |
| F22 | Đánh giá truyện | Người dùng | Chấm điểm và nhận xét truyện | Điểm, nhận xét | Đánh giá được lưu |
| F23 | Theo dõi người dùng | Người dùng | Theo dõi người dùng khác để cập nhật hoạt động sáng tác | Người dùng cần theo dõi | Quan hệ theo dõi được tạo |
| F24 | Xem hồ sơ người dùng | Khách/Người dùng | Xem thông tin công khai và các truyện công khai của một người dùng | Người dùng | Hồ sơ được hiển thị |
| F25 | Nhận thông báo | Người dùng | Nhận thông báo về truyện đang theo dõi, người đang theo dõi hoặc các tương tác liên quan | Sự kiện hệ thống | Thông báo được tạo |
| F26 | Thông báo chương mới | Hệ thống | Tự động thông báo khi truyện được theo dõi có chương mới | Chương mới được xuất bản | Người theo dõi nhận thông báo |
| F27 | Xem thống kê truyện | Người dùng | Xem thống kê các truyện do mình tạo như lượt đọc, theo dõi, yêu thích, đánh giá... | Dữ liệu tương tác | Thống kê được hiển thị |
| F28 | Báo cáo nội dung | Người dùng | Báo cáo truyện, chương hoặc bình luận có nội dung vi phạm | Nội dung, lý do báo cáo | Báo cáo được ghi nhận |
| F29 | Quản lý người dùng | Quản trị viên | Xem, khóa hoặc mở khóa tài khoản | Tài khoản | Trạng thái tài khoản được cập nhật |
| F30 | Quản lý truyện | Quản trị viên | Kiểm tra, ẩn hoặc xử lý truyện vi phạm quy định | Truyện | Trạng thái truyện được cập nhật |
| F31 | Quản lý bình luận | Quản trị viên | Kiểm tra và xử lý các bình luận vi phạm | Bình luận | Bình luận được xử lý |
| F32 | Quản lý báo cáo | Quản trị viên | Xem và xử lý các báo cáo do người dùng gửi | Báo cáo | Báo cáo được xử lý |
| F33 | Quản lý thể loại | Quản trị viên | Thêm, sửa, xóa các thể loại truyện | Thông tin thể loại | Danh mục thể loại được cập nhật |

---

## 3. Phân quyền tổng quát

Hệ thống gồm ba tác nhân chính:

| Tác nhân | Quyền chính |
|---|---|
| **Khách** | Xem, tìm kiếm, lọc và đọc các truyện công khai; đăng ký và đăng nhập |
| **Người dùng** | Có toàn bộ chức năng đọc và tương tác; đồng thời có thể sáng tác, xuất bản và quản lý truyện của chính mình |
| **Quản trị viên** | Quản lý người dùng, truyện, bình luận, báo cáo và danh mục của toàn hệ thống |

> **Lưu ý:** Không tồn tại role `AUTHOR` riêng. Mọi người dùng đều có khả năng sáng tác truyện.

---

## 4. Mô hình quyền của người dùng

```text
User A
├── Đọc truyện của User B
│   ├── Theo dõi
│   ├── Yêu thích
│   ├── Bình luận
│   └── Đánh giá
│
└── Truyện do User A tạo
    ├── Chỉnh sửa
    ├── Thêm / sửa / xóa chương
    ├── Lưu nháp
    ├── Public / Private
    ├── Publish
    ├── Xóa
    └── Xem thống kê
```

---

## 5. Nguyên tắc phân quyền truyện

Quyền quản lý truyện được xác định dựa trên **quyền sở hữu** thay vì role tác giả.

Ví dụ:

```text
story.owner_id == current_user.id
```

Nếu điều kiện trên đúng, người dùng được phép:

- Chỉnh sửa truyện.
- Xóa truyện.
- Thêm, sửa và xóa chương.
- Xuất bản truyện/chương.
- Chuyển đổi Public/Private.
- Thay đổi trạng thái truyện.
- Xem thống kê của truyện.

Người dùng khác không có quyền chỉnh sửa nội dung truyện nhưng có thể đọc và tương tác với truyện nếu truyện được công khai.

---

## 6. Nhóm chức năng chính

### 6.1. Tài khoản và hồ sơ

- Đăng ký.
- Đăng nhập.
- Quản lý hồ sơ cá nhân.
- Xem hồ sơ người dùng khác.
- Theo dõi người dùng.

### 6.2. Sáng tác và quản lý truyện

- Tạo truyện.
- Lưu bản nháp.
- Chỉnh sửa truyện.
- Quản lý chương.
- Xuất bản truyện/chương.
- Thiết lập Public/Private.
- Quản lý trạng thái truyện.
- Xóa truyện.
- Xem thống kê truyện.

### 6.3. Khám phá và đọc truyện

- Tìm kiếm truyện.
- Lọc truyện.
- Sắp xếp truyện.
- Xem truyện hot.
- Đọc truyện.
- Lịch sử đọc.
- Tiếp tục đọc.

### 6.4. Tương tác

- Theo dõi truyện.
- Yêu thích truyện.
- Bình luận.
- Đánh giá.
- Báo cáo nội dung.

### 6.5. Thông báo

- Thông báo chương mới.
- Thông báo cập nhật truyện.
- Thông báo hoạt động liên quan đến người dùng.

### 6.6. Quản trị hệ thống

- Quản lý người dùng.
- Quản lý truyện.
- Quản lý bình luận.
- Quản lý báo cáo.
- Quản lý thể loại.
