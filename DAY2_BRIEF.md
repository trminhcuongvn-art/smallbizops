# DAY2_BRIEF — SmallBizOps / Ông Đồ.AI

Ngày: 2026-05-31 23:30 ICT  
Owner: Trợ Lý + Bún  
Mục tiêu: biến SmallBizOps/Ông Đồ.AI từ demo 5 tool tiếng Việt thành bộ landing có khả năng kéo traffic, đo chuyển đổi, mở rộng đa ngôn ngữ và template/news pipeline.

## 1. Quyết định Day 2

Ưu tiên Day 2 không phải thêm AI API, mà là **mở rộng phân phối + đo lường + tăng use-case** trong phạm vi zero-cost:

1. Tách 5 tool thành các landing/tool page có URL riêng.
2. Thêm bản tiếng Anh cho 5 tool để mở traffic ngoài Việt Nam.
3. Chuẩn bị 6 language routes để scale sau.
4. Tạo template library cho prompt/output.
5. Gắn news/trend pipeline vào nội dung hằng ngày để có lý do quay lại.
6. Thêm tracking nhẹ bằng UTM/query/localStorage, chưa dùng external analytics nếu chưa chốt consent.

## 2. 5 tool pages EN cần tạo

Nguồn hiện có: `viet-nhanh.html` có 5 tool zero-cost.  
Day 2 nên tạo landing/tool routes tiếng Anh để test traffic quốc tế.

| Tool | VI hiện tại | EN page đề xuất | Primary keyword | CTA |
|---|---|---|---|---|
| Caption | Viết caption bán hàng | `/tools/sales-caption-en.html` | free sales caption generator | Copy prompt / Open ChatGPT |
| Product | Mô tả sản phẩm | `/tools/product-description-en.html` | product description prompt generator | Generate prompt |
| Biz post | Bài đăng kinh doanh | `/tools/business-post-en.html` | small business post generator | Create post prompt |
| Summary | Tóm tắt văn bản | `/tools/text-summary-en.html` | summarize text prompt | Summarize with ChatGPT |
| Job | Tin tuyển dụng | `/tools/job-post-en.html` | job post generator | Create job post |

Acceptance Day 2:
- Mỗi page có title/description/OG meta riêng.
- Không gọi API.
- Có nút Copy + Open ChatGPT.
- Có UTM source nội bộ khi link từ homepage.

## 3. 6 language routes

Không cần dịch full ngay. Cần chuẩn URL + metadata + fallback content để sẵn sàng scale.

| Route | Ngôn ngữ | Ưu tiên | Ghi chú |
|---|---|---:|---|
| `/vi/` | Vietnamese | P0 | route chính hoặc alias về `viet-nhanh.html` |
| `/en/` | English | P0 | ưu tiên test quốc tế |
| `/th/` | Thai | P1 | SEA, phù hợp BaDiVi/SME |
| `/id/` | Indonesian | P1 | thị trường lớn |
| `/ms/` | Malay | P1 | Malaysia/Brunei |
| `/tl/` | Filipino | P1 | Philippines |

Day 2 scope hợp lý:
- Tạo cấu trúc route + landing stub cho EN trước.
- Các route TH/ID/MS/TL chỉ cần placeholder sạch + waitlist/CTA nếu chưa có bản dịch thật.

## 4. Template library

Tạo thư mục đề xuất:

```text
/templates/
  vi/
    sales-caption.json
    product-description.json
    business-post.json
    text-summary.json
    job-post.json
  en/
    sales-caption.json
    product-description.json
    business-post.json
    text-summary.json
    job-post.json
```

Schema mỗi template:

```json
{
  "id": "sales-caption-vi-v1",
  "language": "vi",
  "title": "Caption bán hàng",
  "inputFields": ["product", "audience", "tone", "channel"],
  "promptTemplate": "...",
  "exampleInput": {},
  "exampleOutput": "...",
  "updatedAt": "2026-05-31"
}
```

KPI:
- 10 template JSON đầu tiên trong 24h.
- 5 template có example tốt.
- Reuse được trong HTML bằng JS local, không backend.

## 5. News / trend integration

Hiện có `trend.html` và cron trend daily. Day 2 nên biến trend thành traffic loop:

1. Homepage có block “Xu hướng hôm nay”.
2. Mỗi trend item có CTA: “Biến trend này thành caption/bài đăng bằng Ông Đồ.AI”.
3. Link sang `viet-nhanh.html?tool=caption&utm_source=trend&utm_campaign=daily_trend`.
4. `viet-nhanh.html` đọc query param để preselect tool nếu dễ làm.

Acceptance:
- 3 CTA từ trend sang tool.
- UTM rõ.
- Không cần analytics external.

## 6. Tracking nhẹ Day 2

Không dùng external analytics ngay. Dùng 3 lớp zero-cost:

1. UTM trên internal links:
   - `utm_source=home`
   - `utm_medium=internal_cta`
   - `utm_campaign=ongdo_day2`
2. Local event log:
   - lưu `localStorage.ongdoEvents` với event: page_view, tool_select, copy_prompt, open_chatgpt.
3. Console debug mode:
   - chỉ log nếu `?debug=1`.

Sau này nếu cần mới thêm Plausible/GA4.

## 7. 7-day zero-cost traffic plan

| Ngày | Việc | KPI |
|---|---|---|
| D1 | Hoàn thiện Day 2 routes + tracking nhẹ | 5 EN pages draft, 10 internal links UTM |
| D2 | Đăng 5 bài hướng dẫn dùng prompt trên Facebook/Zalo/LinkedIn cá nhân | 100 visits |
| D3 | Làm 10 template JSON VI/EN | 10 templates |
| D4 | Tối ưu SEO title/description cho 5 tool pages | 5 indexed-ready pages |
| D5 | Kết nối trend → tool CTA | CTR nội bộ >5% |
| D6 | Viết case study “5 phút tạo nội dung bán hàng” | 1 long-form page |
| D7 | Review localStorage event/export thủ công | biết top CTA/tool |

## 8. Task đề xuất cho Bún sau brief

### Task A — Tool pages EN
- Deadline: 4h
- Checkpoint: 2h
- Evidence: 5 HTML pages, live 200, copy/open ChatGPT hoạt động.

### Task B — Tracking nhẹ
- Deadline: 2h
- Checkpoint: 1h
- Evidence: localStorage có event khi copy/open ChatGPT, UTM trên CTA.

### Task C — Trend CTA loop
- Deadline: 2h
- Checkpoint: 1h
- Evidence: trend.html có CTA sang tool với UTM.

## 9. Rủi ro / không làm vội

- Không thêm AI API lúc này để giữ zero-cost.
- Không dịch máy hàng loạt nếu chưa review chất lượng.
- Không dùng analytics external khi chưa chốt privacy/consent.
- Không mở quá nhiều page nếu chưa có template reusable.

## 10. Kết luận

Day 2 nên tập trung vào **distribution architecture**: nhiều route hơn, CTA rõ hơn, tracking nhẹ hơn, trend loop tốt hơn. Đây là bước tăng khả năng kiếm traffic mà không tốn quota/API.
