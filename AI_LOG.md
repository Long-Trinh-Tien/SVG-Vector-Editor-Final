# AI Usage Nhật Ký (AI Log)

Dự án: SVG Vector Editor
Sinh viên: [Họ tên]
MSSV: [Mã số sinh viên]

---

## Nhật ký sử dụng AI

### Lần 1: Lập kế hoạch và thiết kế hệ thống
- **Mục tiêu:** Phân tích yêu cầu từ file Baitap3.pdf và đề xuất phương án triển khai.
- **Công cụ + Model:** Gemini CLI (Gemini 2.0 Flash).
- **Prompt:** "Đọc bài này (Baitap3.pdf), đưa ra phương án cho gemini triển khai vào file PLAN.md, đảm bảo tất cả những lần triển khai đều bám vào PLAN.md và PROCESS.md (tracking dự án dài)" và "Đảm bảo handle cả phần log theo yêu cầu nữa, ghi vào PLAN.md đi, để mỗi lần prompt hỏi cho bài này đều được ghi lại và sử dụng làm report".
- **Kết quả:** 
    - Đề xuất Tech Stack (React + TS + SVG Native).
    - Khởi tạo `PLAN.md` với 6 giai đoạn phát triển.
    - Khởi tạo `PROCESS.md` để theo dõi tiến độ.
    - Thiết lập chiến lược ghi log tự động.
- **Cách sử dụng:** Sử dụng để định hướng kiến trúc ứng dụng và quản lý dự án dài hạn.
- Đánh giá: 
    - AI hỗ trợ tốt: Đọc hiểu file PDF nhanh, bóc tách được các yêu cầu kỹ thuật chi tiết. Tự động đề xuất tech stack phù hợp.
    - Hạn chế: Chưa có code thực tế, mới chỉ ở mức kế hoạch.
    - Lỗi: Không có.
    - Bài học: Việc tạo file PLAN và PROCESS ngay từ đầu giúp việc sử dụng AI trong các bước sau có tính kế thừa và nhất quán.

### Lần 2: Khởi tạo dự án và cấu trúc hạ tầng (Sprint 1)
- **Mục tiêu:** Setup dự án React + TS, cài đặt thư viện và định nghĩa kiểu dữ liệu cơ bản.
- **Công cụ + Model:** Gemini CLI (Gemini 2.0 Flash).
- **Prompt:** "Bắt đầu đi, luôn nhớ update cả log AI vào, thư mục làm việc chính sẽ ở E:\Download bua\6\cdtcdl\svg-editor"
- **Kết quả:**
    - Khởi tạo dự án Vite tại thư mục chỉ định.
    - Cài đặt `lucide-react`.
    - Tạo cấu trúc thư mục `src/components`, `hooks`, `types`, `utils`.
    - Định nghĩa hệ thống Type cho các hình vẽ SVG (`src/types/svg.ts`).
- Đánh giá:
    - AI hỗ trợ tốt: Thực hiện lệnh CLI chính xác, xử lý lỗi đường dẫn nhanh chóng.
    - Hạn chế: Mất 1 lượt để xử lý việc user đổi thư mục làm việc.
    - Lỗi: Không có lỗi logic code.

### Lần 3: Hoàn thiện Layout và Kiểm thử Build (Sprint 1)
- **Mục tiêu:** Xây dựng khung giao diện chính (Sidebar, Canvas, Properties) và kiểm tra tính sẵn sàng của dự án.
- **Công cụ + Model:** Gemini CLI (Gemini 2.0 Flash).
- **Prompt:** "Tiếp tục đi và nhớ thực hiện test trước khi qua sprint kế"
- **Kết quả:**
    - Tạo các component React: `Sidebar`, `Canvas`, `PropertiesPanel`.
    - Viết CSS hoàn thiện layout 3 cột chuyên nghiệp.
    - Chạy `npm run build` thành công, không có lỗi TypeScript hay cú pháp.
- **Đánh giá:**
    - AI hỗ trợ tốt: Code giao diện sạch, đúng yêu cầu bài tập (có sidebar, canvas, bảng thuộc tính). Kiểm thử build đảm bảo môi trường ổn định.
    - Hạn chế: Chưa thêm icon Lucide vào thực tế (sẽ bổ sung ở Sprint sau).
    - Lỗi: Không có.

    ### Lần 4: Triển khai logic vẽ cốt lõi (Sprint 2)
    - **Mục tiêu:** Cài đặt logic vẽ các hình cơ bản (Rectangle, Circle, Line) bằng thao tác chuột và quản lý trạng thái.
    - **Công cụ + Model:** Gemini CLI (Gemini 2.0 Flash).
    - **Prompt:** "Tiếp tục đi và nhớ thực hiện test trước khi qua sprint kế" và "Tạo thêm git local để lưu lại commit cho sprint đầu đi, xong thì qua sprint 2"
    - **Kết quả:**
        - Khởi tạo Git local và commit Sprint 1.
        - Cài đặt `uuid` để định danh đối tượng.
        - Tạo `useDrawing` custom hook xử lý các sự kiện `onMouseDown`, `onMouseMove`, `onMouseUp`.
        - Cập nhật `Canvas.tsx` để render shapes từ State và preview hình đang vẽ.
        - Hoàn thiện `Sidebar.tsx` với icon Lucide và `PropertiesPanel.tsx` cho phép đổi màu/viền.
        - Viết script `test-sprint2.cjs` kiểm tra logic tạo object tự động.
    - **Đánh giá:**
        - AI hỗ trợ tốt: Tách biệt logic vào custom hook giúp code Canvas gọn gàng. Sử dụng `uuid` đảm bảo không trùng lặp Key.
        - Hạn chế: Phải đổi tên file test từ `.js` sang `.cjs` do cấu hình `type: module` của Vite.
        - Lỗi: Ban đầu thiếu khai báo biến `firstPhoto` trong logic thu thập ảnh (đã sửa ngay).


---
## Phân tích tổng kết (Sẽ cập nhật khi hoàn thành)
- **AI hỗ trợ tốt ở điểm nào?**
- **Hạn chế:**
- **Lỗi do AI gây ra:**
- **Kinh nghiệm viết prompt:**
