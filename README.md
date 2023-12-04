# Tinder Clone Admin + Sever

### Công nghệ sử dụng

- **ASP.NET Web API:**

  - Xây dựng server API sử dụng ASP.NET để cung cấp dữ liệu cho frontend kết hợp JWT (JSON Web Token) để bảo vệ các  
    điểm cuối API.

- **Twilio:**

  - Tích hợp với Twilio để gửi tin nhắn SMS.

- **Đăng Nhập Xã Hội:**

  - Sử dụng Google Login API và Facebook Login API để xác thực người dùng thông qua tài khoản Google và Facebook.

- **WebSocket với SignalR:**

  - Triển khai truyền thông thời gian thực bằng cách sử dụng SignalR để hỗ trợ WebSocket.

- **PeerJS:**

  - Tích hợp PeerJS để hỗ trợ truyền dữ liệu thời gian thực giữa các máy khách (frontend).

### Database

- **SQL Server:**

  - Lưu trữ dữ liệu người dùng và thông tin liên quan một cách an toàn.
    (Note dự án đang được cấu hình dùng LocalDB SQL Server của Visual Studio bảng 2022 , 
    có thể bị lỗi cấu hình trên
    các phiên bản khác hay trên SQL Server Management Studio =-=)

## Hướng Dẫn Cài Đặt Dự Án

1. **Cài Database:**

- Mở SQL Server Object Explorer trong Visual Studio Code (đề xuất sử dụng bản 2022).
- Chọn LocalDB làm cơ sở dữ liệu trong SQL Server Object Explorer.
- Sao chép và chạy nội dung của tệp CreateDatabase.sql để tạo cơ sở dữ liệu.
- Sao chép và chạy nội dung của tệp AddData.sql để nhập dữ liệu.
- Sao chép và chạy nội dung của tệp Procedure.sql để khởi tạo các thủ tục cho cơ sở dữ liệu.
- Lưu ý: Sử dụng tệp ResetIdentity.sql để đặt lại danh tính của dữ liệu trong cơ sở dữ liệu khi cần thiết. và ảnh
  minh họa database chưa chính xác tuyệt đối

2. **Tạo Tài Khoản**

- Chạy sever bằng visual code
- Trên giao diện Swagger UI 
  - tìm và chạy API: GenAutomaticallyUser
    chọn 100 (để tạo 100 tài khoản ảo)
  - tìm và chạy API: GetUserSettingById để lấy thông tin user 1 
  - tìm và API UpdateSetting dán object Setting vừa nhận được từ API GetUserSettingById
  và sửa trường Email thành Gmail đã đăng kí Facebook hoặc Google.
  (giải thích: tại vì vẫn chưa làm chức năng đăng kí tài khoản)


