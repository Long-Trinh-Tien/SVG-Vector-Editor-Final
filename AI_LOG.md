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

        ### Lần 5: Debug lỗi không vẽ được hình (Sprint 2 - Hotfix)
        - **Mục tiêu:** Khắc phục lỗi giao diện hiện nhưng không thao tác vẽ được.
        - **Công cụ + Model:** Gemini CLI (Gemini 2.0 Flash).
        - **Prompt:** "Có giao diện nhưng không vẽ gì được hãy debug đi ? thêm những cái này vào AI_LOG luôn"
        - **Kết quả:**
        - Phân tích và phát hiện lỗi toạ độ do dùng `clientX/Y` trực tiếp thay vì chuyển đổi sang toạ độ SVG (`matrixTransform`).
        - Phát hiện lỗi không hiển thị được `rect` khi kéo ngược hướng (width/height âm).
        - Cập nhật `useDrawing.ts`:
            - Sử dụng `getSVGCoordinates` để lấy toạ độ chính xác trong không gian `viewBox`.
            - Sử dụng `Math.min` và `Math.abs` cho Rectangle để hỗ trợ vẽ đa hướng.
            - Thêm logic `isValid` để tránh tạo ra các hình có kích thước bằng 0 (dot) khi vô tình click.
        - **Đánh giá:**
        - AI hỗ trợ tốt: Tự chẩn đoán được các lỗi phổ biến khi làm việc với SVG mà không cần user mô tả kỹ thuật.
        - Hạn chế: Logic ban đầu quá đơn giản, không tính đến trường hợp người dùng kéo chuột ngược hướng.
        - Lỗi: Toạ độ sai lệch và giá trị âm cho thuộc tính SVG.
        - Bài học: Luôn sử dụng toạ độ nội bộ của SVG (`getScreenCTM`) thay vì toạ độ viewport của trình duyệt.

### Lần 7: Triển khai logic chọn, di chuyển, xóa hình và bổ sung Polygon (Sprint 3)
- **Mục tiêu:** Cho phép tương tác với các hình đã vẽ và triển khai sớm công cụ Polygon.
- **Công cụ + Model:** Gemini CLI (Gemini 2.0 Flash).
- **Prompt:** "Update hình polygon ở sprint này luôn trước khi qua sprint khác"
- **Kết quả:**
    - Cập nhật `useDrawing.ts`:
        - Hỗ trợ vẽ đa điểm (multi-point) cho Polygon.
        - Hiển thị nét vẽ preview nối từ điểm cuối đến vị trí chuột hiện tại.
        - Kết thúc vẽ bằng phím `Enter` hoặc `Double Click`.
    - Cập nhật `useManipulation.ts`: Hỗ trợ di chuyển toàn bộ các điểm của Polygon bằng cách cộng thêm độ dời (delta).
    - Cập nhật `Canvas.tsx`: Render thẻ `<polygon>` và lắng nghe sự kiện `onDoubleClick`.
    - Kiểm thử: `test-sprint3.cjs` đã xác nhận logic di chuyển Polygon hoạt động chính xác. Build thành công.
- **Đánh giá:**
    - AI hỗ trợ tốt: Xử lý mượt mà việc chuyển đổi giữa chế độ vẽ 2 điểm (Rect/Circle) và đa điểm (Polygon) trong cùng một hook.
    - Hạn chế: Việc vẽ đa giác yêu cầu phím tắt hoặc double click nên cần có chỉ dẫn UI cho người dùng (Tooltip).
    - Lỗi: Không có.

### Lần 8: Triển khai công cụ Văn bản (Text Tool)
- **Mục tiêu:** Cho phép người dùng chèn và chỉnh sửa nội dung văn bản trên Canvas.
- **Công cụ + Model:** Gemini CLI (Gemini 2.0 Flash).
- **Prompt:** "Còn tính năng thêm văn bản thì sao ? sprint sau hay làm luôn ? làm luôn thì triển khai ngay, còn sprint sau thì hãy sang sprint mới luôn"
- **Kết quả:**
    - Cập nhật `useDrawing.ts`: Thêm logic click-to-place cho Text. Tự động chọn (Select) đối tượng ngay sau khi tạo.
    - Cập nhật `Canvas.tsx`: Render thẻ `<text>` của SVG, hỗ trợ các thuộc tính `fontSize` và `fill`.
    - Cập nhật `PropertiesPanel.tsx`: Thêm mục "Text Content" và "Font Size" riêng cho đối tượng văn bản.
    - Cập nhật `useManipulation.ts`: Hỗ trợ di chuyển văn bản bằng chuột.
    - Build: Thành công.
- **Đánh giá:**
    - AI hỗ trợ tốt: Tích hợp mượt mà vào luồng logic hiện tại. Việc cho phép sửa text trong Properties Panel thay vì sửa trực tiếp trên Canvas giúp giảm độ phức tạp của code mà vẫn đảm bảo tính năng.
    - Hạn chế: Chưa có tính năng chọn Font family (sẽ xem xét sau).
    - Lỗi: Không có.

### Lần 6: Sửa lỗi Build liên quan đến TypeScript Import Type (Sprint 2 - Build fix)
- **Mục tiêu:** Khắc phục lỗi biên dịch `TS1484` do cấu hình `verbatimModuleSyntax`.
- **Công cụ + Model:** Gemini CLI (Gemini 2.0 Flash) + Generalist Subagent.
- **Prompt:** "npm run build còn lỗi mà, fix cho xong, test rồi hẳn tiếp"
- **Kết quả:**
    - Phát hiện cấu hình TypeScript mới yêu cầu sử dụng `import type` cho các khai báo kiểu dữ liệu.
    - Cập nhật 5 file nguồn (`App.tsx`, `Canvas.tsx`, `PropertiesPanel.tsx`, `Sidebar.tsx`, `useDrawing.ts`) sang cú pháp `import type`.
    - Chạy `npm run build` thành công rực rỡ.
- **Đánh giá:**
    - AI hỗ trợ tốt: Sửa lỗi hàng loạt nhanh chóng thông qua subagent.
    - Hạn chế: Chưa cập nhật kịp với template tsconfig mặc định mới nhất của Vite ngay từ đầu.
    - Lỗi: Vi phạm quy tắc `verbatimModuleSyntax`.
    - Bài học: Với các dự án TS hiện đại, luôn ưu tiên dùng `import type` khi chỉ cần lấy metadata của Type/Interface.

---
## Phân tích tổng kết (Sẽ cập nhật khi hoàn thành)
- **AI hỗ trợ tốt ở điểm nào?**
- **Hạn chế:**
- **Lỗi do AI gây ra:**
- **Kinh nghiệm viết prompt:**
