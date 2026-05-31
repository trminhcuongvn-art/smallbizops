# REVIEW_REQUEST Cáo — Ông Đồ.AI v2/v3 Noti expansion

## Scope
- Task 1: Expand content formulas to 14 in `viet-nhanh.html` and `content-formulas.html`.
- Task 2: Add 9-industry selector/context to 5 EN tool pages and `viet-nhanh.html`.
- Task 3: Add 10-platform selector/context to 5 EN tool pages and `viet-nhanh.html`.

## Evidence
- Local HTTP 200: `viet-nhanh.html`, `content-formulas.html`, and 5 EN tool pages on `python3 -m http.server 8799`.
- Source verify:
  - `content-formulas.html`: 14 `formula-item`, Checklist 1-8, Lỗi 1-6.
  - Tool pages: `INDUSTRY_CONTEXT`, `PLATFORM_CONTEXT`, `industry_selector`, `platform_selector`.
- No API call check: grep for `fetch|XMLHttpRequest|axios|api.openai` returned no matches in HTML/JS.

## Review notes
- Platform guidance is format-only and avoids performance claims.
- No framework added; static HTML/CSS/JS only.
