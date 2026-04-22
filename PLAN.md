# Project Plan: SVG Vector Editor

## 1. Goal
Xây dựng ứng dụng web GUI cho phép tạo, chỉnh sửa và quản lý các đối tượng đồ họa SVG (Line, Rect, Circle, Polygon, Text) với khả năng lưu/mở file .svg.

## 2. Tech Stack
- **Frontend:** React (Vite + TypeScript).
- **Styling:** Vanilla CSS (Modern, Clean UI).
- **Icons:** Lucide React.
- **File Handling:** Browser File System Access API hoặc Blob.

## 3. Implementation Phases
## 3. Sprint-based Implementation Phases

### Sprint 1: Project Setup & Infrastructure
- [x] Khởi tạo dự án Vite + React + TS.
- [x] Thiết lập cấu trúc thư mục (components, hooks, types, utils).
- [x] Xây dựng khung giao diện chính (Layout).
- [x] **AI Log Setup:** Khởi tạo file `AI_LOG.md`.
- [x] **Verification:** Chạy `npm run build` và kiểm tra lỗi render cơ bản.

### Sprint 2: Core Drawing Engine
- [x] Quản lý trạng thái hình vẽ (SVG Element State).
- [x] Triển khai Line, Rectangle, Circle.
- [x] Mouse event handling cho drawing.
- [x] **Verification:** Script kiểm tra tính toàn vẹn của State khi thêm đối tượng mới.

### Sprint 3: Selection & Manipulation
- [x] Object Selection logic.
- [x] Move và Delete (Keyboard support).
- [x] **Verification:** Test script mô phỏng hành động click chọn và di chuyển tọa độ.

### Sprint 4: Properties & Styling
- [x] UI cho Properties Panel.
- [x] Stroke, Fill, Opacity, Stroke-width updates.
- [x] **Verification:** Kiểm tra việc áp dụng thuộc tính vào thẻ SVG output.

### Sprint 5: Advanced Shapes & Persistence
- [x] Polygon drawing (Multi-point).
- [x] Text elements đính kèm.
- [x] Export/Import SVG file.
- [x] **Verification:** Script so sánh nội dung file Export và Import.

### Sprint 6: Final Polish & Report
- [ ] UI Refinement (Transitions, Clean UX).
- [ ] Viết tài liệu hướng dẫn.
- [ ] Hoàn thiện `AI_LOG.md`.
- [ ] **Verification:** Full Regression Test trên trình duyệt.

## 4. Testing & Verification Strategy
Mỗi Sprint chỉ được coi là hoàn thành khi:
1. **Linting & Types:** `npm run lint` và `tsc` không có lỗi.
2. **Functional Test:** Thực hiện kiểm thử thông qua các script tự động hoặc quy trình kiểm thử từng bước (Manual Verification) được ghi lại.
3. **Build Check:** Dự án phải build thành công bản production.

## 5. AI Logging Strategy (Mandatory)
- Giao diện tối giản (Minimalist), hỗ trợ Dark/Light mode (ưu tiên Light mode chuyên nghiệp).
- Trải nghiệm tương tác mượt mà (không lag khi kéo thả).
