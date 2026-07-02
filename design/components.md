# Component library — resolve-notes "The Print Shop"

Semantic tokens only (legacy `--serif/--paper` aliases keep the engine's
markup working). Type: Anton / Schibsted Grotesk / IBM Plex Mono.

## Marker-highlight nav (signature)
Mono caps tabs; the active tab gets a **highlighter swipe** (raspberry-soft
band + 3px raspberry base rule, tucked behind the text). Brand: tilted
raspberry square + Anton wordmark. Theme toggle at the end.

## Masthead
Mono eyebrow → **Anton caps H1** (clamp 2.6–4.9rem) with the raspberry
"WRITE IT DOWN." → lede.

## Form panel
Sticky card: mono caps labels, borderless paper wells (raise + raspberry ring
on focus), pill buttons, and the divided "paste a ticket thread" secondary
flow.

## The printed article (engine-emitted, restyled)
- **Perforated ink-strip**: a dashed raspberry band across the card's top
  (::before) — every article is printed matter.
- kbtag mono caps + **stamp badge** (rotated −1°, inset-ruled):
  `AI-DRAFTED · NEEDS REVIEW` (amber) / `REVIEWED` (green).
- Title: Schibsted 700 tight; mono section marks (SYMPTOMS / ROOT CAUSE /
  FIX / PREVENTION) trailing into hairlines.
- **Fix steps**: semantic `<ol>` with raspberry counter chips.
- Receipt: paper well, mono, names model · source · time + the human-review
  line.
- Tags as paper ticket pills; related notes as raspberry-soft pill links;
  artbar: Copy Markdown (primary) / Download / Approve (when unreviewed) /
  Save to library (with duplicate confirm).

## Library
Pill search + Export JSON · tag chips ("All (n)" + top tags with counts;
active = solid raspberry) · article cards (title + stamp, mono meta, action
row) with spring hover. Designed empty + no-matches states.

## Reference
Schibsted 700 h2 prose (governance, deep links, POPIA note) + the example
Markdown in a paper `pre`.

## Empty / wait / error states
Dashed frames with worded states ("Writing the article…", "AI backend not
enabled yet" with the exact env var) — no spinners in the print shop.
