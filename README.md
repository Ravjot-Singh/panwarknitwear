# Panwar Knitwear

React + Vite frontend for Panwar Knitwear, built from the Claude Design canvas
(`Panwar Knitwear.dc.html`) and the feature set of the existing site at
panwarknitwear.com.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Structure

```
src/
  main.jsx                 app entry — router + cart provider
  App.jsx                  route table
  styles/
    tokens.css             colours, type, spacing, motion — all from the design
    global.css             element resets, layout primitives, buttons, forms
    animations.css         the two motion families (see below)
  data/
    products.js            the ten styles, pricing, specs, size logic, INR()
    reviews.js             reviews and the feedback survey options
    site.js                contact details, listings, leadership, fabrics, copy
  context/
    CartContext.jsx        cart state, retail/wholesale mode, totals, persistence
  hooks/
    useReveal.js           one-shot IntersectionObserver
    useScrollTop.js        scroll reset on route change
  components/
    layout/                Header (with mobile drawer), Footer, Layout
    ui/                    Reveal, ComicPanel, ComicImage, Chip, Stepper, Field
    product/               ProductCard, KnitPlate
  pages/
    Home/ Collection/ Product/ Cart/ Checkout/
    OrderPlaced/ About/ Contact/ Feedback/
```

Each page owns its stylesheet next to the component; shared rules live in
`styles/`.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home — hero, both labels, current run, the craft, journal |
| `/collection` | All ten styles, label filter, retail/wholesale toggle |
| `/product/:id` | Single style — sizes, quantity, spec table |
| `/cart` | Bag, quantity controls, summary |
| `/checkout` | Three steps: details → delivery → payment |
| `/order-placed` | Confirmation with order number |
| `/about` | History, stats, timeline, fabrics, leadership, buyer services |
| `/contact` | Enquiry form, addresses, phone numbers, external listings |
| `/feedback` | Star rating, fit and delivery survey, recent reviews |

`/collection` reads `?label=ZONIXA`, `?label=MSP%20SPORTS` and `?mode=wholesale`
so the footer and hero can deep-link into a filtered view.

## Motion

Two families, both defined in `styles/animations.css`:

**`.pk-reveal`** — the quiet one. A 14px fade-up on scroll, one-shot, staggered
across grids via a `--pk-delay` custom property.

**`.pk-comic*`** — the Spider-Verse panel treatment, applied to every card and
image that is **not** a product card: the hero and craft plates, journal
entries, the About timeline, stat blocks, leadership and buyer-service cards,
reviews and the contact plate. It combines a hard inked frame with an offset
print shadow, a Ben-Day halftone dot screen, a one-shot cyan/magenta
misregistration flash as the panel lands, and a 2–3px CMYK split plus a small
lift on hover. Amplitudes are deliberately small — offsets stay under 3px,
rotation under half a degree, and nothing loops.

Product cards stay plain on purpose: a fade-up and a slight plate drift, so the
goods read straight while the editorial panels around them carry the style.

**The hero and the navbar** are turned up a notch above the rest of the page,
since they set the tone:

- The headline is set word by word (`WordReveal`), each word swinging up out of
  its own clipped box on a stagger; the kicker draws a rust rule out beside it,
  and the lede, buttons and stat blocks follow in sequence.
- The hero plate carries print registration crosshairs at two corners and a
  shallow pointer parallax (`usePointerParallax`, ±9px) so the photograph drifts
  against the cursor.
- Buttons fill with an ink wipe drawn in from the left rather than swapping
  colour.
- The header condenses on scroll (74px → 60px, tagline collapsing away), gains a
  shadow, and draws a rust reading-progress rule along its bottom edge
  (`useScrollProgress`).
- The wordmark splits faintly into cyan/magenta on hover — the comic
  misregistration at wordmark scale — and the current nav item is marked by a
  small rust dot that drops into place. On mobile the drawer links stagger in
  behind the panel.

### The chromatic cast

The same two mis-registration channels (`--pk-cmy-c` cyan, `--pk-cmy-m`
magenta) run through three places at three very different strengths:

| Where | Strength | Intent |
| --- | --- | --- |
| Card shadows | 0.44–0.56 alpha, **zero blur** | Crisp offset plates — magenta pushed right, cyan pushed left, ink almost true |
| Wordmark hover | 0.46–0.52 alpha, ±1.5px | Full plate separation on the page's largest type |
| Nav / footer link hover | 0.45–0.62 alpha, ±0.9px | A sub-pixel fringe — catches the eye without fuzzing the letterform |
| Themed numerals (resting) | 0.36–0.52 alpha, ±0.55px | Prices and figures carry the split permanently |
| Inside a card | 0.03–0.07 alpha | Atmosphere only; should not be consciously visible |

The card shadows are **hard-edged on purpose** — that crispness is what makes it
read as separated print plates rather than a coloured glow, so don't add blur
back. Offsets are deliberately unequal (magenta 7px, cyan 6px) so it looks like
a real registration error rather than a symmetrical effect, and they pull
further apart on hover, as though the press slipped mid-run. Shadow order
matters: earlier-listed shadows paint on top, so ink sits over magenta over
cyan.

The one exception is the sticky header. A full-width bar can't show a horizontal
plate offset — it would fall off the viewport — so there the misregistration
reads vertically instead, as two thin colour rules slipped below the ink one.

Type uses two different mechanisms for the same idea. The **wordmark** duplicates
itself through `::before` / `::after` (hence the `data-text` attribute on it),
which gives clean, fully-formed ghost glyphs — worth it at that size. **Links**
use `text-shadow` instead, via the `--pk-split-text` / `--pk-split-text-dark`
tokens, so any link picks up the effect without needing a duplicate copy of its
label in markup. Footer links take the stronger of the two because they sit on
the dark band, where the channels read as a faint glow rather than as ink.
Both are disabled under `prefers-reduced-motion`.

A third group carries the split **permanently** rather than on hover, listed in
one block at the end of `styles/animations.css`: every price, the hero and About
stat figures, timeline years, craft step numbers, comic panel ticks, review
stars and the order number. Prices step up to the full link-strength split when
their card is hovered, so the plate separation on the panel and the one on the
type move together.

These are picked deliberately, not applied to every numeral — supporting figures
like the cart subtotal and per-unit line meta stay plain. Treating all of them
the same stops reading as design and starts reading as a rendering fault.

## Deploying

`vercel.json` does two things that matter:

- **SPA rewrites.** Every path falls through to `index.html`. Without this,
  loading or refreshing any route other than `/` returns a 404 on Vercel, since
  there is no file at `/collection`. Vercel checks the filesystem before
  applying rewrites, so real assets are still served directly.
- **Cache headers.** `/assets/*` is content-hashed by Vite, so it is safe to
  mark `immutable` for a year. `/img/*` is **not** hashed — the filenames are
  stable (`z1.jpg`, `m2.jpg`) — so it gets a one-day cache with revalidation
  instead. Marking those immutable would strand viewers on an old photo for a
  year after you replace one, which matters given `m2.jpg` is a placeholder.

`.vercelignore` keeps `node_modules/`, `dist/`, env files and docs off the
upload; Vercel installs and builds from source on its own machines.
`public/img/` is deliberately **not** ignored — those are the product
photographs and must ship.

The in-card values are **capped by contrast, not by taste**, and the token block
in `styles/tokens.css` records the measurements. At the gradient's strongest
corner, against the muted body colour `#6b6055`:

- on cream `#f7f3ec`, 0.07 leaves **5.05:1** — comfortably over AA's 4.5
- on sand `#ece3d6` the headroom is much smaller, so panels sitting on sand take
  the lighter wash: 0.03 leaves **4.64:1**, where 0.045 would leave only 4.55:1

Raise either token and re-check both surfaces first. Every wash layer is
`pointer-events: none` and sits below captions, ticks and card content.

Both hooks deliberately avoid `requestAnimationFrame`: `scroll` and
`pointermove` are already coalesced to one event per frame, and some embedded
contexts throttle rAF to a standstill, which would leave the header frozen in
its initial state.

`prefers-reduced-motion: reduce` disables all of it and renders every panel in
its final state.

## Cart

`CartContext` holds the lines and the retail/wholesale mode, both persisted to
`localStorage` (`pk-cart`, `pk-mode`) and guarded against storage being
unavailable. Wholesale switches pricing to per-piece rates, opens quantity at
each style's MOQ, steps by the dozen, and adds GST at 5% on top rather than
inclusive.

Checkout validates each step in turn and clears the cart on submission. There is
no backend — order placement generates a reference number client-side, and the
contact and feedback forms confirm locally.

## Content notes

- Phone numbers (`+91 98760 45457`, `+91 98157 03769`, `+91 99999 82998`), the
  JustDial / IndiaMart / Google Maps listings, the Instagram, LinkedIn and Quora
  links, the ZONIXA and MSP Sports sites, the leadership names and the fabric
  list are carried over verbatim from the existing site.
- The existing site publishes `email@example.com`, which is a placeholder, so
  the design's `orders@panwarknitwear.in` is used instead. Replace it with the
  real address before launch.
## Imagery

Every photograph on the site is Panwar's own catalogue photography, downloaded
from the existing site so nothing depends on an external host. All shots are
982×1147 flat-lays on a dark studio floor.

- `public/img/products/` — one per style, mapped by `image` / `alt` in
  `src/data/products.js`.
- `public/img/editorial/` — eight distinct shots behind the hero, craft, About
  and Contact panels and the three journal cards, mapped by `IMAGES` and
  `JOURNAL[].image` in `src/data/site.js`.

Two substitutions to be aware of, both flagged in the source:

- **Mill Crew Socks — 3 pack** has no photograph. The original site publishes no
  sock imagery anywhere (its MSP catalogue page just re-serves the ZONIXA
  shots), so the closest catalogue image stands in. Replace
  `public/img/products/m2.jpg` once socks are photographed.
- The original's `who-we-are.jpg`, `our-craftsmanship.jpg` and
  `our-leadership.jpg` are 500×160 banner strips — far too small for the
  editorial panels — so garment shots stand in for them there.

`KnitPlate` renders product photos under a top-and-bottom scrim so the brand and
plate captions stay legible against the dark floor, and falls back to the
design's woven knit swatch automatically if a photo is missing or fails to load.
The three tiles beneath the garment shot on a product page are fabric-texture
swatches by design, not missing images.
