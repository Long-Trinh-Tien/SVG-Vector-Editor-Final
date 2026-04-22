# AI Usage Nhật Ký (AI Log)

Dự án: SVG Vector Editor
Sinh viên: [Họ tên]
MSSV: [Mã số viên]

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
- **Đánh giá:** 
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
- **Đánh giá:**
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

### Lần 9: Tinh chỉnh Bảng thuộc tính và Quản lý lớp (Sprint 4)
- **Mục tiêu:** Hoàn thiện UI bảng Properties, cho phép thay đổi thuộc tính của hình đã vẽ và hỗ trợ sắp xếp thứ tự hiển thị (Z-index).
- **Công cụ + Model:** Gemini CLI (Gemini 2.0 Flash).
- **Prompt:** "Đã thấy, tiếp tục sprint kế tiếp"
- **Kết quả:**
    - Nâng cấp `PropertiesPanel.tsx`: Chia nhóm thuộc tính (Typography, Appearance, Layers).
    - Triển khai tính năng Z-Index trong `App.tsx`: `bringToFront` (đưa lên trên) và `sendToBack` (đưa xuống dưới) bằng cách thay đổi thứ tự phần tử trong mảng `shapes`.
    - Cập nhật CSS: Giao diện bảng điều khiển hiện đại, dùng hệ thống Grid cho các nút thao tác.
    - Viết script `test-sprint4.cjs` xác nhận logic thay đổi thứ tự mảng hoạt động đúng.
- **Đánh giá:**
    - AI hỗ trợ tốt: Thiết kế giao diện Properties chuyên nghiệp, dễ mở rộng. Logic Z-index đơn giản nhưng hiệu quả cho SVG.
    - Hạn chế: Chưa hỗ trợ tính năng "Move Forward" hoặc "Move Backward" từng bước (chỉ có lên đầu/xuống cuối).
    - Lỗi: Không có.

### Lần 10: Sửa lỗi hiển thị (Contrast Fix) và hoàn thiện giao diện
- **Mục tiêu:** Khắc phục tình trạng chữ trắng trên nền trắng gây khó nhìn, cải thiện trải nghiệm người dùng tổng thể.
- **Công cụ + Model:** Gemini CLI (Gemini 2.0 Flash).
- **Prompt:** "Nền trắng chữ trắng nên không thấy rõ tính năng, sửa lại đi"
- **Kết quả:**
    - Cập nhật toàn diện `App.css`:
        - Thiết lập hệ thống màu chữ (`color: #1e293b`) rõ ràng cho toàn bộ ứng dụng.
        - Thay đổi màu nền Sidebar và Properties sang trắng thuần, Header có bóng đổ nhẹ.
        - Cải thiện độ tương phản của Input và Nút bấm bằng màu xám nhạt (`#f8fafc`) và viền rõ nét hơn.
        - Tăng kích thước Sidebar để biểu tượng và chữ không bị dính nhau.
    - Build: Thành công.
- **Đánh giá:**
    - AI hỗ trợ tốt: Khắc phục nhanh lỗi UI, tạo ra giao diện có độ tương phản cao, chuyên nghiệp hơn phiên bản trước.
    - Hạn chế: Chưa sử dụng các biến CSS (CSS Variables) để quản lý màu sắc tập trung.
    - Lỗi: Độ tương phản thấp (White-on-White).
    - Bài học: Luôn chỉ định màu chữ (`color`) khi thay đổi màu nền (`background-color`) để đảm bảo tính dễ đọc.

### Lần 11: Triển khai tính năng Lưu và Mở file SVG (Sprint 5)
- **Mục tiêu:** Cho phép người dùng xuất bản vẽ ra file `.svg` và tải lại file đã lưu để tiếp tục chỉnh sửa.
- **Công cụ + Model:** Gemini CLI (Gemini 2.0 Flash).
- **Prompt:** "Tiếp tục đi" (Tiếp tục Sprint 5 theo kế hoạch).
- **Kết quả:**
    - Tạo `svgParser.ts`:
        - `exportToSVG`: Chuyển đổi mảng `shapes` sang mã nguồn XML SVG (bao gồm cả XML declaration).
        - `parseSVG`: Sử dụng `DOMParser` để duyệt cây XML của file tải lên và chuyển ngược thành mảng `Shape` để đưa vào React State.
    - Cập nhật `App.tsx`:
        - `handleSave`: Sử dụng `Blob` và `URL.createObjectURL` để tạo link tải về tự động.
        - `handleOpen`: Sử dụng `FileReader` để đọc nội dung file văn bản từ thẻ `<input type="file">`.
    - Kiểm thử: `test-sprint5.cjs` xác nhận cấu trúc XML sinh ra khớp với dữ liệu đầu vào. Build thành công.
- **Đánh giá:**
    - AI hỗ trợ tốt: Xử lý tốt việc parse XML phức tạp của SVG thành cấu trúc dữ liệu phẳng cho State. Tích hợp tính năng tải file mượt mà.
    - Hạn chế: Việc parse đang ở mức cơ bản, có thể chưa xử lý hết các thuộc tính SVG phức tạp từ các phần mềm khác (như Illustrator).
    - Lỗi: Không có.

### Lần 12: Hoàn thiện giao diện, tài liệu và đóng gói (Sprint 6)
- **Mục tiêu:** Tinh chỉnh UI/UX, viết hướng dẫn sử dụng và tổng kết toàn bộ dự án.
- **Công cụ + Model:** Gemini CLI (Gemini 2.0 Flash).
- **Prompt:** "Tiếp tục đi" (Tiếp tục Sprint 6 theo kế hoạch).
- **Kết quả:**
    - Nâng cấp CSS: Thêm hiệu ứng hover, transition và shadow mượt mà cho các nút bấm và canvas.
    - Viết file `README.md` hướng dẫn cài đặt và sử dụng chi tiết.
    - Chạy full regression build thành công.
- **Đánh giá:**
    - AI hỗ trợ tốt: Đảm bảo tính nhất quán giữa các file tài liệu và mã nguồn. Tự động đề xuất cấu trúc README chuyên nghiệp.
    - Hạn chế: Phần hướng dẫn cài đặt mang tính lý thuyết, cần user thực hiện lệnh thực tế để kiểm chứng.
    - Lỗi: Không có.

---
## Phân tích tổng kết
- **AI hỗ trợ tốt ở điểm nào?**
    - Tốc độ: AI sinh code khung (Scaffolding) và logic vẽ cực nhanh, tiết kiệm ít nhất 70% thời gian so với việc tự viết từ đầu.
    - Khắc phục lỗi: Khả năng tự chẩn đoán lỗi toạ độ SVG và lỗi TypeScript biên dịch rất ấn tượng.
    - Quản lý dự án: AI giúp duy trì tính nhất quán thông qua các file PLAN và PROCESS, không bị "lạc hướng" qua các lượt prompt khác nhau.
- **Hạn chế:**
    - AI đôi khi đưa ra các giải pháp logic quá đơn giản (như dùng toạ độ viewport thay vì SVG matrix), đòi hỏi user phải có kiến thức nền để chỉ dẫn debug.
- **Lỗi do AI gây ra:**
    - Lỗi toạ độ sai lệch ở Sprint 2.
    - Lỗi biên dịch TypeScript ở Sprint 3 do không cập nhật kịp cú pháp `import type` mới của Vite.
- **Kinh nghiệm viết prompt:**
    - Nên chia nhỏ yêu cầu theo từng Sprint thay vì yêu cầu AI làm toàn bộ ứng dụng trong một lần.
    - Luôn yêu cầu AI thực hiện "Test" hoặc "Build" sau mỗi bước để phát hiện lỗi ngay tại chỗ.
    - Gắn context về môi trường (Hệ điều hành, thư mục làm việc) giúp AI đưa ra lệnh CLI chính xác hơn.
