# REVIEW_REQUEST — RFC-001 Ông Đồ.AI Phase 1

Reviewer: Cáo
Producer: Subagent execute
Date: 2026-05-31

## Scope
Rename safe từ VietNhanh/Văn AI sang **Ông Đồ.AI — trợ lý viết tiếng Việt** trên SmallBizOps, giữ URL `viet-nhanh.html`.

## Paths / URL
- Local file: `/Users/minhcuong/.openclaw/workspace/dropship/smallbizops/viet-nhanh.html`
- Screenshot: `/Users/minhcuong/.openclaw/workspace/dropship/smallbizops/ongdo-ai-phase1-screenshot.png`
- Live URL: https://trminhcuongvn-art.github.io/smallbizops/viet-nhanh.html
- Screenshot URL: https://trminhcuongvn-art.github.io/smallbizops/ongdo-ai-phase1-screenshot.png

## Commit
- `48367a64eb3fd9ef2eee303c822e74fcb284ab30` — `Implement Ong Do AI zero-cost prompt MVP`

## Evidence
- Static check PASS: đủ 5 tool, có text “Ông Đồ.AI — trợ lý viết tiếng Việt”.
- Disabled old AI/API logic: no `fetch(`, `API_KEY`, `API_URL`, `VietNhanh`, `Văn AI` in `viet-nhanh.html`.
- Local HTTP test: `http://127.0.0.1:8099/viet-nhanh.html` returned 200.
- Live HTTP verify: `https://trminhcuongvn-art.github.io/smallbizops/viet-nhanh.html` returned 200.
- Screenshot generated with headless Chrome.

## 5 tool test result
1. Caption mạng xã hội — PASS: generates Vietnamese prompt/template for Facebook/Zalo.
2. Mô tả sản phẩm shop online — PASS: generates Vietnamese prompt/template for shop listing.
3. Email/tin nhắn kinh doanh — PASS: generates Vietnamese prompt/template for email/Zalo/SMS.
4. Tóm tắt văn bản dài — PASS: generates Vietnamese prompt/template with summary/action/risk structure.
5. Bài đăng tuyển dụng — PASS: generates Vietnamese prompt/template for JD/recruitment post.

## Notes
- MVP is zero-cost/static only; no external AI API call.
- Uses relative/no external assets; font stack includes `Be Vietnam Pro`, `Inter`, `Noto Sans`, system sans-serif for Vietnamese support.
