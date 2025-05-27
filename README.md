# React TypeScript + .NET Web API Project

Dự án full-stack với React TypeScript frontend và .NET Web API backend.

## Cấu trúc dự án

```
├── frontend/          # React TypeScript app (Vite)
├── backend/           # .NET Web API
└── README.md         # Hướng dẫn này
```

## Yêu cầu hệ thống

- Node.js (v18 hoặc cao hơn)
- .NET 8.0 SDK
- npm hoặc yarn

## Cài đặt và chạy dự án

### 1. Chạy Backend (.NET API)

```bash
# Di chuyển vào thư mục backend
cd backend

# Chạy API
dotnet run
```

API sẽ chạy tại: `http://localhost:5000`

### 2. Chạy Frontend (React)

Mở terminal mới:

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies (nếu chưa cài)
npm install

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

## Tính năng

- ✅ React TypeScript với Vite
- ✅ .NET Web API với CORS được cấu hình
- ✅ Proxy API calls từ frontend đến backend
- ✅ JWT Authentication system
- ✅ Login/Logout functionality
- ✅ Protected routes và API endpoints
- ✅ Weather Forecast API endpoint mẫu
- ✅ TypeScript interfaces cho type safety
- ✅ **Tra cứu thông tin BHYT qua API VNPost**
- ✅ Ant Design UI components
- ✅ Responsive design

## Thông tin đăng nhập

Dự án có sẵn 2 tài khoản demo:

**Admin:**
- Username: `admin`
- Password: `password`

**User:**
- Username: `user`
- Password: `123456`

## API Endpoints

- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `GET /weatherforecast` - Lấy dự báo thời tiết mẫu (yêu cầu authentication)
- `POST /api/bhyt/lookup` - Tra cứu thông tin BHYT (yêu cầu authentication)

## Cấu hình

### Frontend (Vite)
- Proxy `/api/*` requests đến `http://localhost:5000`
- TypeScript strict mode enabled

### Backend (.NET)
- CORS enabled cho `http://localhost:5173`
- Development environment configuration
- OpenAPI/Swagger documentation

## Development

1. Khởi động backend trước: `cd backend && dotnet run`
2. Khởi động frontend: `cd frontend && npm run dev`
3. Mở browser tại `http://localhost:5173`

## Build Production

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
dotnet publish -c Release
```

## Tính năng Tra cứu BHYT

### Mô tả
Tính năng tra cứu thông tin bảo hiểm y tế (BHYT) thông qua API của VNPost, cho phép người dùng tra cứu thông tin thẻ BHYT bằng mã số BHXH.

### Cách sử dụng
1. Đăng nhập vào hệ thống
2. Click menu "Tra cứu BHYT" ở sidebar
3. Nhập mã số BHXH (10 chữ số)
4. Click "Tra cứu" để xem kết quả

### Thông tin hiển thị
- Họ và tên, mã số BHXH, mã thẻ BHYT
- Ngày sinh, giới tính, địa chỉ
- Thời hạn hiệu lực thẻ (từ ngày - đến ngày)
- Nơi đăng ký KCB ban đầu
- Mức hưởng và trạng thái thẻ

### API Integration
- **VNPost API**: `https://ssm.vnpost.vn/connect/tracuu/thongtinthe`
- **Backend Endpoint**: `POST /api/bhyt/lookup`
- **Authentication**: JWT Bearer token required

**Xem hướng dẫn chi tiết trong file `BHYT_LOOKUP_GUIDE.md`**

## Troubleshooting

- Đảm bảo backend đang chạy trước khi start frontend
- Kiểm tra ports 5000 và 5173 không bị conflict
- Xem console logs để debug API calls
- Sử dụng file `backend/test-bhyt.http` để test API BHYT
