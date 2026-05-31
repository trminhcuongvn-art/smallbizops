# Review Request — Ông Đồ.AI UI Polish

**Trang:** `viet-nhanh.html` (URL giữ nguyên)
**Live:** https://trminhcuongvn-art.github.io/smallbizops/viet-nhanh.html
**Commit:** `66bdd30` — "Polish Ong Do AI UI: minimalist palette, Be Vietnam Pro, ChatGPT open button"
**Screenshot after:** `ongdo-ai-polish-after.png` (1280×2200)
**Backup bản cũ:** `viet-nhanh.html.bak-ongdo-20260531-184118`

## Tóm tắt thay đổi
- Bỏ toàn bộ dark theme + gradient AI tím/xanh → chuyển sang minimalist editorial sáng.
- Thêm nút **"Mở ChatGPT với prompt này"** cạnh nút Copy ở cả 5 tool.
- Giữ nguyên 5 tool zero-cost, không gọi API, không gửi data lên server.

## Checklist minimalist-ui — pass/fail

### Font
| Mục | Trạng thái |
|---|---|
| Không dùng Inter/Roboto/Arial/Open Sans làm font chính | PASS — Be Vietnam Pro (Google Fonts), đủ dấu tiếng Việt |
| Geist ưu tiên, fallback Be Vietnam Pro nếu Geist thiếu dấu | PASS — chọn Be Vietnam Pro vì Geist không có dấu tiếng Việt đầy đủ (đúng yêu cầu) |
| Heading letter-spacing âm, line-height ~1.1 | PASS — h1 `letter-spacing:-.03em; line-height:1.05` |
| Body off-black #111111, không #000000 | PASS — `--ink:#111111` |

### Màu sắc
| Mục | Trạng thái |
|---|---|
| Không gradient tím/xanh AI | PASS — `background-image: none` (verify computed style) |
| Nền #FFFFFF / #F7F6F3, border #EAEAEA | PASS — `--bg:#FFFFFF; --surface:#F7F6F3; --border:#EAEAEA` |
| Chỉ 1 accent color | PASS — accent = ink #111111, bỏ vàng/xanh cũ |
| Shadow tinted, không rgba(0,0,0,.3) | PASS — bỏ hết box-shadow nặng, dùng border 1px |

### Layout
| Mục | Trạng thái |
|---|---|
| Không 3 cột đều generic | PASS — 2 cột (≥768px), card #5 span full width (asymmetric) |
| max-width 1200–1440px | PASS — `min(1200px,100%)` |
| Section padding thoáng | PASS — wrap padding 56px desktop, card padding 24px |
| Không height:100vh | PASS — dùng `min-height:100dvh` |
| Mobile w-full, px nhỏ <768px | PASS — `@media(max-width:767px)` px 16px, button flex full |

### Components
| Mục | Trạng thái |
|---|---|
| Card không border+shadow+white cùng lúc | PASS — chỉ border, bỏ shadow |
| Button hover state | PASS — generate `#2b2b2b`, secondary surface bg |
| Button active/pressed feedback | PASS — `translateY(1px)` khi :active |
| Focus ring keyboard | PASS — `:focus-visible` box-shadow ring; input `:focus` ring |
| CTA #111111 bg, #FFFFFF text, radius 4-6px | PASS — generate bg #111, text #fff, radius 6px |

### Content
| Mục | Trạng thái |
|---|---|
| Không Lorem Ipsum | PASS |
| Không buzzword (Elevate/Seamless...) | PASS |
| Sentence case headings | PASS — subtitle/notice sentence case |

### Code quality
| Mục | Trạng thái |
|---|---|
| Semantic HTML (main/header/section/article/footer) | PASS |
| Meta title/description/og | PASS — thêm og:title, og:description, og:type |
| Không dead link (#) | PASS — không có anchor # |
| scroll-behavior smooth | PASS — `html{scroll-behavior:smooth}` |

### Lưu ý lệch nhẹ so với checklist (cần Cáo quyết)
- **Emoji:** checklist khuyên dùng SVG icon thay emoji. Bản này đã **bỏ hết emoji** trong nút/heading (trước đây có ✍️ 📋 ✨). Nút giờ dùng text thuần → đạt tinh thần "không emoji".
- **Border-radius rounded-full cho container:** badge vẫn dùng pill 999px (đúng spec "tags/badges pill shape"); card/button dùng 12px/6px → OK.
- **Animation cubic-bezier:** transitions dùng `cubic-bezier(0.16,1,0.3,1)`. Chưa thêm scroll-entry IntersectionObserver (out of scope polish lần này, không bắt buộc cho tool trang đơn).

## Nút "Mở ChatGPT với prompt này"
- Encode prompt an toàn vào URL: `https://chatgpt.com/?q=<encodeURIComponent(prompt)>`, mở tab mới.
- Prompt quá dài (>6000 ký tự encoded): fallback copy clipboard + mở `https://chatgpt.com/` + báo người dùng dán tay.
- Nút disabled tới khi bấm "Tạo prompt" (tránh mở rỗng), enable sau khi có output.
- **Không gọi API** — chỉ mở URL.

## Evidence
| Gate | Kết quả |
|---|---|
| Test 5 tool sinh prompt | PASS — caption 447, product 494, biz 439, summary 403, job 473 ký tự; 5 nút ChatGPT enable sau generate |
| ChatGPT URL đúng | PASS — `https://chatgpt.com/?q=...`, decode khớp prompt gốc |
| Live HTTP 200 | PASS — 200, có `openChatGPT` trong HTML live |
| Screenshot after | PASS — `ongdo-ai-polish-after.png` |
| Computed style verify | bodyBg #FFFFFF, bgImage none, font Be Vietnam Pro, ink #111, card border #EAEAEA radius 12px, CTA #111/#fff radius 6px |

## Functionality giữ nguyên
5 tool zero-cost: Caption, Mô tả sản phẩm, Email/tin nhắn, Tóm tắt, Tuyển dụng — tất cả hoạt động, logic prompt y nguyên bản cũ.
