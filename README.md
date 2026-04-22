# SVG Vector Editor

Ứng dụng GUI cho phép tạo và chỉnh sửa các đối tượng đồ họa dựa trên chuẩn SVG, phát triển bằng React + TypeScript.

## 1. Tính năng chính

- **Công cụ vẽ cơ bản:** 
  - Rectangle (Hình chữ nhật)
  - Circle (Hình tròn)
  - Line (Đường thẳng)
  - Polygon (Đa giác - Click nhiều điểm, Enter/Double Click để hoàn tất)
  - Text (Văn bản - Click để đặt, sửa nội dung trong bảng Properties)
- **Thao tác đối tượng:**
  - Chọn đối tượng (Select tool)
  - Di chuyển (Kéo thả)
  - Xóa (Phím Delete/Backspace)
  - Sắp xếp lớp (Bring to Front, Send to Back)
- **Tùy chỉnh thuộc tính:**
  - Thay đổi màu nền (Fill), màu viền (Stroke).
  - Độ dày nét vẽ (Stroke Width).
  - Độ trong suốt (Opacity).
- **Quản lý tập tin:**
  - Save SVG: Xuất bản vẽ ra file `.svg` tiêu chuẩn.
  - Open SVG: Tải file `.svg` từ máy để tiếp tục chỉnh sửa.

## 2. Hướng dẫn cài đặt và chạy thử

### Yêu cầu hệ thống
- Node.js (phiên bản 18 trở lên).

### Các bước thực hiện
1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```
2. **Chạy ở chế độ phát triển (Development):**
   ```bash
   npm run dev
   ```
   Sau đó truy cập địa chỉ `http://localhost:5173`.

3. **Xây dựng bản chính thức (Build):**
   ```bash
   npm run build
   ```
4. **Xem trước bản build:**
   ```bash
   npm run preview
   ```

## 3. Nhật ký sử dụng AI
Dự án được hỗ trợ phát triển bởi Gemini CLI. Chi tiết các phiên làm việc và câu lệnh prompt được lưu trữ tại file `AI_LOG.md`.

## 4. Tác giả
- Sinh viên: [Họ tên]
- MSSV: [Mã số sinh viên]
- Lớp: [Tên lớp]
