# Motion spec — resolve-notes "The Print Shop"

Temperament: **press-room brisk** — one clean impression per view, no idling.

## Tokens
```css
--motion:300ms cubic-bezier(.2,0,0,1);
--spring:cubic-bezier(.34,1.26,.5,1);
--emph:cubic-bezier(.05,.7,.1,1);
```

## Choreography (complete)
| Interaction | Animation | Spec |
|---|---|---|
| View render | `.enter` fade + 10px rise | 420ms emph, once |
| Button hover / press | −1px lift / .97 | 130ms spring |
| Card / related-pill hover | −1/−2px lift | 130ms spring |
| Chip toggle | color state swap | 300ms standard |
| Field focus | raise + raspberry ring | 300ms |
| Theme swap | background transition | 300ms |

Zero loops: AI wait states are worded cards, not spinners; stamps are static.

## Reduced motion
Global collapse + `.enter` disabled.
