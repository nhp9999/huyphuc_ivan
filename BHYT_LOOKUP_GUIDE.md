# Hướng dẫn sử dụng tính năng Tra cứu BHYT

## Tổng quan
Tính năng tra cứu BHYT cho phép người dùng tra cứu thông tin thẻ bảo hiểm y tế thông qua API của VNPost.

## Cách sử dụng

### 1. Đăng nhập vào hệ thống
- Truy cập: http://localhost:5173
- Sử dụng tài khoản:
  - **Admin**: username: `admin`, password: `password`
  - **User**: username: `user`, password: `123456`

### 2. Truy cập tính năng tra cứu BHYT
- Sau khi đăng nhập, click vào menu "Tra cứu BHYT" ở sidebar
- Hoặc truy cập trực tiếp: http://localhost:5173/bhyt-lookup

### 3. Tra cứu thông tin
- Nhập mã số BHXH (10 chữ số) vào form
- Click nút "Tra cứu"
- Kết quả sẽ hiển thị ở bên phải

## Thông tin hiển thị

Khi tra cứu thành công, hệ thống sẽ hiển thị:
- **Họ và tên**: Tên đầy đủ của người được bảo hiểm
- **Mã số BHXH**: Mã số bảo hiểm xã hội
- **Mã thẻ**: Mã số thẻ BHYT
- **Ngày sinh**: Ngày sinh của người được bảo hiểm
- **Giới tính**: Nam/Nữ
- **Địa chỉ**: Địa chỉ thường trú
- **Giá trị từ ngày**: Ngày bắt đầu hiệu lực của thẻ
- **Giá trị đến ngày**: Ngày hết hạn của thẻ
- **Nơi đăng ký KCB**: Nơi đăng ký khám chữa bệnh ban đầu
- **Mức hưởng**: Mức hưởng bảo hiểm y tế
- **Trạng thái**: Trạng thái hiện tại của thẻ (Hiệu lực/Hết hạn)

## Lưu ý quan trọng

### Về mã số BHXH:
- Phải có đúng 10 chữ số
- Chỉ chấp nhận số, không chấp nhận chữ cái hoặc ký tự đặc biệt
- Ví dụ hợp lệ: `0123456789`

### Về bảo mật:
- Cần đăng nhập để sử dụng tính năng
- Token xác thực được gửi kèm mọi request
- Thông tin tra cứu được bảo mật theo quy định

### Về hiệu suất:
- Thời gian tra cứu phụ thuộc vào API VNPost
- Có thể mất 2-5 giây để nhận được kết quả
- Nếu không có kết quả, vui lòng kiểm tra lại mã số BHXH

## Xử lý lỗi

### Các lỗi thường gặp:
1. **"Mã số BHXH phải có đúng 10 chữ số"**: Kiểm tra lại định dạng mã số
2. **"Không tìm thấy thông tin BHYT"**: Mã số không tồn tại trong hệ thống
3. **"Có lỗi xảy ra khi tra cứu"**: Lỗi kết nối hoặc hệ thống, thử lại sau

### Khắc phục:
- Kiểm tra kết nối internet
- Đảm bảo mã số BHXH chính xác
- Thử lại sau vài phút nếu có lỗi hệ thống

## API Endpoints

### Backend API:
- **POST** `/api/bhyt/lookup`: Tra cứu thông tin BHYT
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "maSoBHXH": "0123456789" }`

### VNPost API (được gọi từ backend):
- **URL**: `https://ssm.vnpost.vn/connect/tracuu/thongtinthe`
- **Method**: GET
- **Params**: `maSoBHXH=<số_bhxh>`

## Cấu trúc dự án

### Frontend:
- `frontend/src/pages/BhytLookup.tsx`: Component chính
- `frontend/src/pages/BhytLookup.css`: Styles
- `frontend/src/services/bhytService.ts`: Service gọi API

### Backend:
- `backend/Controllers/BhytController.cs`: Controller xử lý request
- `backend/Services/BhytService.cs`: Service gọi VNPost API
- `backend/DTOs/`: Data Transfer Objects

## Troubleshooting

### Nếu frontend không load:
```bash
cd frontend
npm install
npm run dev
```

### Nếu backend không chạy:
```bash
cd backend
dotnet restore
dotnet run
```

### Nếu API không hoạt động:
1. Kiểm tra backend đang chạy tại http://localhost:5000
2. Kiểm tra token xác thực còn hiệu lực
3. Xem log trong console của browser và terminal

## Liên hệ hỗ trợ
Nếu gặp vấn đề, vui lòng kiểm tra:
1. Log trong browser console (F12)
2. Log trong terminal backend
3. Kết nối mạng và firewall
