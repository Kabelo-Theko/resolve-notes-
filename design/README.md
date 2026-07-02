# resolve-notes — "The Print Shop" design system

**Project:** [resolve-notes](https://github.com/Kabelo-Theko/resolve-notes-) · **Complete UI/UX overhaul, July 2026** (built at the recalibrated 2026 bar)

## The concept

A knowledge base is a **print shop for fixes**: every resolved ticket becomes
printed matter — set in a fixed structure, stamped with its provenance, and
review-gated before it circulates. The redesign gives the tool that pride:
warm paper stock, raspberry ink, an Anton caps masthead ("FIX IT ONCE. WRITE
IT DOWN."), a perforated ink-strip along the top of every article, numbered
fix steps set like instructions, and NEEDS-REVIEW / APPROVED **stamp badges**
(rotated a degree, inset-ruled) for the governance the app already enforces.

### Design DNA

| | |
|---|---|
| **Essence** | The team's print shop. Knowledge as printed matter, not chat scroll. |
| **One-liner** | "A letterpress shop hired to run the IT knowledge base." |
| **Canvas** | Warm paper `#FAF7F1` (default) · ink-room `#16121A` |
| **Accent** | Raspberry ink `#D6104F` / pink plate `#FF7BA9` by night — the one hot color (getquoti-style confidence). Review amber and approved green are governance stamps only. |
| **Type cast** | Anton (hero + brand, caps) · Schibsted Grotesk 700/400 (article titles, text) · IBM Plex Mono (labels, tags, receipts) |
| **Shape** | 12–18px radii, pill controls; the article card is squared-off with its dashed **ink-strip perforation** on top |
| **Signature** | The perforated raspberry strip on every article; rotated stamp badges; numbered fix-steps as pink counters; **marker-highlight nav** (the active tab gets a highlighter swipe) |
| **Rejection list** | No green KB-default (v1 retired), no Newsreader/IBM Plex Sans, no serif body, no left-border receipts, no gradients |

## Functional parity (zero loss — engine untouched)

The engine ships byte-identical: generate from structured fields, generate
from a pasted thread, the worked Outlook example, reasoning receipts, the
needs-review → Approve governance flow, duplicate detection on save, library
with debounced search + tag chips + related-notes linking, JSON export,
Supabase-optional persistence, URL params (`view/q/tag`), the
`window.resolveNotes` API, and every designed empty/error state.

New: paper/ink-room themes (persisted), marker-highlight nav, Anton masthead,
perforated article strip, stamp badges, numbered-counter fix steps, pill
search + chips, spring hovers, 91% 4px grid, audit 0 fails / 0 warnings.

## Files
`tokens.css` · `tailwind.config.js` · `components.md` · `accessibility.md` ·
`motion.md` · `grid.md`.

## Reaching every state
| State | How |
|---|---|
| Empty press | Load the app |
| Worked example | "See an example" — receipted, review-stamped article |
| AI flows / no-key states | Generate (fields or thread) offline — designed notices |
| Needs review → Approved | Example → Save to library → Approve (stamp flips) |
| Duplicate guard | Save the example twice — confirm dialog |
| Library search/chips/related | Save 2+ articles sharing tags |
| Ink-room theme | Moon toggle; persists |
| Deep links | `?q=printer`, `?tag=gateway`, `?view=library` |
