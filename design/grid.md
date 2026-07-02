# Responsive grid & layout — resolve-notes "The Print Shop"

## Breakpoints
| Width | Changes |
|---|---|
| ≤ 560px | Article padding tightens; example `pre` shrinks; topbar compresses |
| ≤ 900px | Desk collapses; panel un-sticks above the article |
| 1080px | `--page-max` |

Checked at 360 / 768 / 1280.

## Structure
```
topbar: ◆ RESOLVE-NOTES · [GENERATE|LIBRARY|REFERENCE]⌄marker · ◐
mast: eyebrow → ANTON CAPS H1 → lede
desk: [form panel 360px sticky | article 1fr]
  article: ▤ perforated strip → kbtag + stamp → title
    → receipt → SYMPTOMS → ROOT CAUSE → FIX (counter ol)
    → PREVENTION → tags → related → artbar
library: search+export → chips → cards
reference: prose + markdown pre
```

## Rhythm
4px grid (91% audited). Panel 24px; article 36px with mono section marks at
28px intervals; masthead 52px top. Radii: 12 (wells) / 18 (cards) / pill
(controls, tags, chips, search); stamps square-ish 4px (they're stamps).
