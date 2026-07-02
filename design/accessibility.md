# Accessibility sheet — resolve-notes "The Print Shop"

Target WCAG 2.2 AA. Implemented in `docs/index.html`.

## Measured contrast (WCAG 2.x)

### Paper (light)
| Pair | Ratio | Verdict |
|---|---|---|
| ink #221D26 / paper #FAF7F1 | 15.4:1 | AAA |
| soft #5A5361 / card #FFFEFB | 7.32:1 | AAA |
| raspberry text #C00D47 / paper | 5.79:1 | AA |
| on-accent #FFF5F8 / raspberry #D6104F | 4.86:1 | AA |
| review stamp #9A5B1E / paper | 5.05:1 | AA |
| approved stamp #1E6E48 / paper | 5.81:1 | AA |

### Ink-room (dark)
| Pair | Ratio | Verdict |
|---|---|---|
| ink #F0EAF2 / room #16121A | 15.6:1 | AAA |
| soft #BBB2C4 / card #221C28 | 8.13:1 | AAA |
| pink #FF7BA9 / room | 7.62:1 | AAA |
| on-accent #3A0A1E / pink | 6.97:1 | AA+ |
| review / approved stamps on room | 10.2 / 10.0:1 | AAA |

Stamp tints ≤12% alpha; stamp text uses the solid colors above with a 1.5px
inset rule (visible shape without relying on color).

## Structure & ARIA (engine contracts preserved)
- Nav `.active` marker-highlight adds a visual swipe; the active state also
  carries color+weight, and the engine's class contract is untouched. Theme
  toggle adds `aria-pressed` + dynamic label. Hamburger hidden (3 links fit).
- Review governance is triple-encoded: stamp color + text ("AI-drafted ·
  needs review" / "Reviewed") + the Approve action's presence.
- Fix steps are a real `<ol>`; the pink counters are CSS `counter()` on
  `::before` with the list semantics intact.
- Receipts name model · source · time in plain text.
- Library search keeps its debounced focus-restoring behavior (engine);
  chips are real click targets ≥ 32px with text labels + counts.
- Related notes are labelled links; duplicate-save uses a native confirm.

## Keyboard
Topbar (tabs → theme) → form fields in order → Generate / Example → thread
flow → article actions (Copy / Download / Approve / Save) → related links.
Library: search → export → chips → per-card actions. Two-layer raspberry
`:focus-visible` rings everywhere; buttons ≥ 44px.

## Motion
One 420ms rise per view; spring hovers (−1/−2px); no loops (AI wait states
are worded, not spun). Full reduced-motion collapse.
