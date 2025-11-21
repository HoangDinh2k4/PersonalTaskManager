
-----

# Personal Task Manager

Ứng dụng quản lý công việc cá nhân (Personal Task Manager) được xây dựng với kiến trúc **RESTful API** sử dụng **.NET 8** cho Backend và **React (Vite)** cho Frontend.

## Công nghệ sử dụng

  * **Backend:** ASP.NET Core Web API (.NET 8) 
  * **Frontend:** React + Vite 
  * **Database:** MySQL (Docker) 
  * **ORM:** Entity Framework Core (Pomelo MySQL) 

-----

## 1. Cấu hình Database (MySQL)

Dự án sử dụng MySQL chạy trên Docker. Bạn cần khởi tạo container trước khi chạy ứng dụng.

### Thông tin kết nối (Credentials)

  * **Host:** `localhost`
  * **Port:** `3306`
  * **Username:** `root`
  * **Password:** `root`
  * **Database Name:** `TaskDb`

### Cách chạy MySQL bằng Docker

Mở terminal và chạy lệnh sau để tạo và khởi động container:

```bash
docker run --name task-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=TaskDb -p 3306:3306 -d mysql:8.0.44-debian
```

-----

## 2. Hướng dẫn chạy Backend (TaskApi)

### Cấu hình

Kiểm tra file `TaskApi/appsettings.json` và đảm bảo chuỗi kết nối đúng với cấu hình Docker ở trên:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Port=3306;Database=TaskDb;User=root;Password=root;"
}
```

### Các bước chạy

1.  Mở terminal tại thư mục **`TaskApi`**:
    ```bash
    cd TaskApi
    ```
2.  Khôi phục các thư viện (Restore packages):
    ```bash
    dotnet restore
    ```
3.  Khởi tạo Database (Migration):
    ```bash
    dotnet ef database update
    ```
4.  Chạy ứng dụng:
    ```bash
    dotnet run
    ```
-----

## 3. Hướng dẫn chạy Frontend (task-client)

### Cấu hình môi trường (.env)

API URL đang được cấu hình trỏ về Backend tại port `5199`.
Nếu cần thay đổi, chỉnh sửa file `src/services/api.js`:

### Các bước chạy

1.  Mở terminal mới (giữ terminal Backend đang chạy) và vào thư mục **`task-client`**:
    ```bash
    cd task-client
    ```
2.  Cài đặt các gói phụ thuộc (Install dependencies):
    ```bash
    npm install
    ```
3.  Chạy ứng dụng ở chế độ Development:
    ```bash
    npm run dev
    ```
-----

## Danh sách chức năng

1.  **Xem danh sách Task:** Hiển thị tất cả công việc đang làm và đã hoàn thành.
2.  **Thêm Task mới:** Nhập tiêu đề, mô tả, ngày hết hạn (mặc định trạng thái "Đang làm").
3.  **Cập nhật Task:** Chỉnh sửa thông tin hoặc đổi trạng thái sang "Hoàn thành".
4.  **Xóa Task:** Xóa công việc khỏi danh sách.
5.  **Lọc Task:** Lọc theo trạng thái (Đang làm / Hoàn thành).

-----

### Business Rules (Ràng buộc)

> **Lưu ý quan trọng:** Hệ thống đã áp dụng các quy tắc validate dữ liệu sau:

1.  **Tính duy nhất:** Task **không được trùng tên** (chỉ áp dụng khi trạng thái là *Đang làm*).
2.  **Thời gian:** Ngày hết hạn (Deadline) phải **≥ Ngày hiện tại**.

-----