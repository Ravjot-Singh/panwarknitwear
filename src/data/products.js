export const BRANDS = {
  ZONIXA: 'ZONIXA',
  MSP: 'MSP SPORTS',
}

/* Garment categories, for the collection filters and the size guide. */
export const CATEGORIES = [
  { key: 'hoodie', label: 'Hoodies' },
  { key: 'sweatshirt', label: 'Sweatshirts' },
  { key: 'tee', label: 'T-shirts' },
  { key: 'polo', label: 'Polos' },
  { key: 'shirt', label: 'Shirts' },
  { key: 'jacket', label: 'Jackets' },
  { key: 'socks', label: 'Socks' },
]

/* Fabric families, coarser than the per-product spec rows so they group. */
export const FABRIC_FAMILIES = [
  { key: 'fleece', label: 'Fleece' },
  { key: 'loopback', label: 'Loopback' },
  { key: 'jersey', label: 'Single jersey' },
  { key: 'pique', label: 'Pique' },
  { key: 'double-knit', label: 'Double-knit' },
  { key: 'oxford', label: 'Oxford' },
  { key: 'sock-knit', label: 'Sock knit' },
]

const SIZES_STANDARD = ['S', 'M', 'L', 'XL', 'XXL']

/* Ten styles across the two labels, exactly as specified in the design.

   `category`, `sizes`, `colors`, `fabric`, `gsm` and `tags` were added for the
   collection search, filters, sort and size guide. Sizes are explicit per
   product now rather than derived from a switch on the id — the old switch
   silently gave m3 the standard range even though its own spec row says
   XS–XXL. Colourways are illustrative demo data, consistent with the ranges
   visible in each catalogue photograph. */
export const PRODUCTS = [
  {
    id: 'z1',
    image: '/img/products/z1.jpg',
    alt: 'ZONIXA loopback hoodie, colour range flat-laid',
    brand: BRANDS.ZONIXA,
    name: 'Ridge Loopback Hoodie',
    spec: '380 GSM loopback · 24 gauge',
    plate: 'Plate 01 — brushed back',
    retail: 2450,
    whole: 1390,
    moq: 60,
    category: 'hoodie',
    fabric: 'loopback',
    gsm: 380,
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'Chalk', hex: '#e8e2d6' },
      { name: 'Olive', hex: '#5c6247' },
      { name: 'Steel Blue', hex: '#4a6b86' },
      { name: 'Rose', hex: '#c9a0a5' },
      { name: 'Ink', hex: '#23211e' },
    ],
    tags: ['hoodie', 'hooded', 'kangaroo pocket', 'brushed', 'winter', 'cotton'],
    copy: 'A 380 GSM cotton loopback hoodie knitted on a 24-gauge frame, brushed on the inside face only so the outside keeps a clean, dry hand. Kangaroo pocket bar-tacked at both corners; hood lined in self fabric with a flat-knit 2x2 rib at the cuff and hem.',
    specs: [
      { k: 'Fabric', v: '380 GSM cotton loopback, 30s combed ring-spun' },
      { k: 'Gauge', v: '24 g circular, 34 inch cylinder' },
      { k: 'Trims', v: 'Self-fabric hood lining, 2x2 rib cuff and hem' },
      { k: 'Finish', v: 'Compacted, bio-washed, residual shrinkage <3%' },
      { k: 'Sizes', v: 'S–XXL · fits true to chart' },
    ],
  },
  {
    id: 'z2',
    image: '/img/products/z2.jpg',
    alt: 'ZONIXA chest-print hoodie, colour range flat-laid',
    brand: BRANDS.ZONIXA,
    name: 'Meridian Chest-Print Hoodie',
    spec: '340 GSM fleece · water-based print',
    plate: 'Plate 02 — chest print',
    retail: 2650,
    whole: 1480,
    moq: 60,
    category: 'hoodie',
    fabric: 'fleece',
    gsm: 340,
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'Sky', hex: '#6f9dc4' },
      { name: 'Navy', hex: '#2b3a55' },
      { name: 'Ink', hex: '#23211e' },
      { name: 'Rose', hex: '#c58f97' },
    ],
    tags: ['hoodie', 'print', 'printed', 'graphic', 'fleece', 'winter'],
    copy: 'The same fleece body, printed across the chest with a water-based pigment — no plastisol, so the print breathes and softens with the garment instead of sitting on top of it. Cured at 150°C and wash-tested to 30 cycles.',
    specs: [
      { k: 'Fabric', v: '340 GSM poly-cotton fleece, brushed back' },
      { k: 'Print', v: 'Water-based pigment, 4 colours, 30-wash tested' },
      { k: 'Gauge', v: '24 g circular' },
      { k: 'Finish', v: 'Compacted, enzyme washed' },
      { k: 'Sizes', v: 'S–XXL' },
    ],
  },
  {
    id: 'z3',
    image: '/img/products/z3.jpg',
    alt: 'ZONIXA full-zip hoodie, colour range flat-laid',
    brand: BRANDS.ZONIXA,
    name: 'Gate Full-Zip Hoodie',
    spec: '400 GSM · coil zip · twin-needle',
    plate: 'Plate 03 — full zip',
    retail: 2890,
    whole: 1640,
    moq: 48,
    category: 'hoodie',
    fabric: 'fleece',
    gsm: 400,
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'Ash', hex: '#b9b6ae' },
      { name: 'Moss', hex: '#5b6a52' },
      { name: 'Coral', hex: '#c9755c' },
      { name: 'Navy', hex: '#2b3a55' },
    ],
    tags: ['hoodie', 'zip', 'full zip', 'zipper', 'jacket', 'heavy', 'winter'],
    copy: 'Our heaviest knit at 400 GSM, cut as a full-zip with a coil zipper set on a taped placket so the front hangs straight when open. Every load-bearing seam is twin-needle; armholes are overlocked and topstitched.',
    specs: [
      { k: 'Fabric', v: '400 GSM cotton-rich fleece' },
      { k: 'Zip', v: 'Coil zip, taped placket, moulded puller' },
      { k: 'Seams', v: 'Twin-needle throughout, bar-tacked stress points' },
      { k: 'Finish', v: 'Compacted, garment washed' },
      { k: 'Sizes', v: 'S–XXL' },
    ],
  },
  {
    id: 'z4',
    image: '/img/products/z4.jpg',
    alt: 'ZONIXA round-neck fleece sweatshirt, colour range flat-laid',
    brand: BRANDS.ZONIXA,
    name: 'Foundry Crew Sweatshirt',
    spec: '330 GSM fleece · 2x2 rib',
    plate: 'Plate 04 — crew neck',
    retail: 1980,
    whole: 1120,
    moq: 72,
    category: 'sweatshirt',
    fabric: 'fleece',
    gsm: 330,
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'Charcoal', hex: '#45423d' },
      { name: 'Navy', hex: '#2b3a55' },
      { name: 'Blush', hex: '#cfa8ad' },
      { name: 'Mint', hex: '#a9c4b3' },
    ],
    tags: ['sweatshirt', 'crew', 'crew neck', 'round neck', 'fleece', 'plain'],
    copy: 'A plain crew in 330 GSM fleece, with a flat-knit 2x2 rib neck taped at the back to stop it stretching out. Cut with a set-in sleeve rather than raglan, so the shoulder line stays where the pattern put it.',
    specs: [
      { k: 'Fabric', v: '330 GSM fleece, 30s combed' },
      { k: 'Neck', v: '2x2 rib, self-tape at back neck' },
      { k: 'Sleeve', v: 'Set-in, twin-needle' },
      { k: 'Finish', v: 'Compacted, bio-washed' },
      { k: 'Sizes', v: 'S–XXL' },
    ],
  },
  {
    id: 'z5',
    image: '/img/products/z5.jpg',
    alt: 'ZONIXA collared half-sleeve pique knit, colour range flat-laid',
    brand: BRANDS.ZONIXA,
    name: 'Grid Collared Half-Sleeve',
    spec: '220 GSM pique · flat-knit collar',
    plate: 'Plate 05 — pique polo',
    retail: 1240,
    whole: 690,
    moq: 100,
    category: 'polo',
    fabric: 'pique',
    gsm: 220,
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'Stone', hex: '#cfc6b5' },
      { name: 'Sky', hex: '#7fa3c0' },
      { name: 'Ash', hex: '#b9b6ae' },
      { name: 'White', hex: '#f2efe8' },
      { name: 'Tan', hex: '#c08f68' },
    ],
    tags: ['polo', 'collar', 'collared', 'pique', 'half sleeve', 'summer'],
    copy: 'A 220 GSM cotton pique with a flat-knit collar knitted to size rather than cut from fabric — it holds its shape through the wash instead of curling. Three-button placket, side vents, drop-tail hem.',
    specs: [
      { k: 'Fabric', v: '220 GSM cotton pique, 30s combed' },
      { k: 'Collar', v: 'Flat-knit to size, tipped option available' },
      { k: 'Placket', v: '3-button, self-fabric, interlined' },
      { k: 'Finish', v: 'Compacted, silicone softened' },
      { k: 'Sizes', v: 'S–XXL' },
    ],
  },
  {
    id: 'm1',
    image: '/img/products/m1.jpg',
    alt: 'MSP Sports plain half-sleeve cotton tee, colour range flat-laid',
    brand: BRANDS.MSP,
    name: 'Baseline Plain Tee',
    spec: '180 GSM · 30s single jersey',
    plate: 'Plate 06 — plain jersey',
    retail: 690,
    whole: 368,
    moq: 144,
    category: 'tee',
    fabric: 'jersey',
    gsm: 180,
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'Ink', hex: '#23211e' },
      { name: 'White', hex: '#f2efe8' },
      { name: 'Teal', hex: '#3f6f6c' },
      { name: 'Rose', hex: '#c58f97' },
      { name: 'Mustard', hex: '#c39a3f' },
    ],
    tags: ['tee', 't-shirt', 'tshirt', 'plain', 'jersey', 'summer', 'half sleeve'],
    copy: 'A 180 GSM single jersey in 30s combed ring-spun cotton — heavy enough to hold its shape, light enough for a Punjab summer. Shoulder-to-shoulder taped, side-seamed, and finished with a 1x1 rib neck.',
    specs: [
      { k: 'Fabric', v: '180 GSM single jersey, 30s combed ring-spun' },
      { k: 'Neck', v: '1x1 rib, shoulder-to-shoulder tape' },
      { k: 'Construction', v: 'Side-seamed, twin-needle hem' },
      { k: 'Finish', v: 'Bio-washed, compacted' },
      { k: 'Sizes', v: 'S–XXL' },
    ],
  },
  {
    id: 'm2',
    /* No sock photography exists on the original site — this is the closest
       Panwar catalogue shot, used as a stand-in until socks are photographed. */
    image: '/img/products/m2.jpg',
    alt: 'Panwar Knitwear packed knitwear, colour range flat-laid',
    brand: BRANDS.MSP,
    name: 'Mill Crew Socks — 3 pack',
    spec: '200N combed cotton · terry heel',
    plate: 'Plate 07 — terry heel',
    retail: 540,
    whole: 268,
    moq: 240,
    category: 'socks',
    fabric: 'sock-knit',
    gsm: null,
    sizes: ['One size'],
    colors: [
      { name: 'White', hex: '#f2efe8' },
      { name: 'Grey', hex: '#b9b6ae' },
      { name: 'Ink', hex: '#23211e' },
    ],
    tags: ['socks', 'sock', 'crew socks', 'terry', 'pack', 'cotton'],
    copy: 'Combed cotton crew socks with a terry heel and toe for cushioning, and a ribbed welt with covered elastane so it grips without cutting in. Linked toe seam, so there is no ridge under the foot.',
    specs: [
      { k: 'Yarn', v: '200 needle combed cotton with covered elastane' },
      { k: 'Heel & toe', v: 'Terry cushioned, linked toe' },
      { k: 'Welt', v: 'Ribbed, 2.5 inch' },
      { k: 'Pack', v: '3 pairs, one size 7–11' },
      { k: 'Care', v: 'Air dry flat — heat relaxes the welt' },
    ],
  },
  {
    id: 'm3',
    image: '/img/products/m3.jpg',
    alt: 'MSP Sports round-neck tee, colour range flat-laid',
    brand: BRANDS.MSP,
    name: 'Open Round-Neck Tee',
    spec: '160 GSM · bio-washed',
    plate: 'Plate 08 — round neck',
    retail: 640,
    whole: 342,
    moq: 144,
    category: 'tee',
    fabric: 'jersey',
    gsm: 160,
    /* XS–XXL, as this style's own spec row states. */
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#f2efe8' },
      { name: 'Ash', hex: '#b9b6ae' },
      { name: 'Ink', hex: '#23211e' },
      { name: 'Olive', hex: '#5c6247' },
    ],
    tags: ['tee', 't-shirt', 'tshirt', 'round neck', 'light', 'layering', 'jersey'],
    copy: 'A lighter 160 GSM round neck with no collar band — the neck rib is set narrow and bio-washed soft. Made for layering and for volume orders where the print is the point.',
    specs: [
      { k: 'Fabric', v: '160 GSM single jersey, 30s combed' },
      { k: 'Neck', v: 'Narrow 1x1 rib, no collar band' },
      { k: 'Construction', v: 'Tubular body available at volume' },
      { k: 'Finish', v: 'Bio-washed' },
      { k: 'Sizes', v: 'XS–XXL' },
    ],
  },
  {
    id: 'm4',
    image: '/img/products/m4.jpg',
    alt: 'MSP Sports full-sleeve collared button shirt, colour range flat-laid',
    brand: BRANDS.MSP,
    name: 'Warp Oxford Shirt',
    spec: '140 GSM yarn-dyed oxford',
    plate: 'Plate 09 — yarn-dyed',
    retail: 1690,
    whole: 940,
    moq: 60,
    category: 'shirt',
    fabric: 'oxford',
    gsm: 140,
    /* Collar sizes, not alpha sizes. */
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'White', hex: '#f2efe8' },
      { name: 'Sky', hex: '#8fb0cb' },
      { name: 'Stone', hex: '#cfc6b5' },
    ],
    tags: ['shirt', 'oxford', 'button down', 'collar', 'woven', 'full sleeve', 'formal'],
    copy: 'A yarn-dyed 140 GSM oxford, woven rather than knitted — the one exception on our floor, cut and finished here with a soft-fused collar and single-needle side seams.',
    specs: [
      { k: 'Fabric', v: '140 GSM yarn-dyed cotton oxford' },
      { k: 'Collar', v: 'Soft-fused button-down, 2-piece' },
      { k: 'Seams', v: 'Single-needle sides, felled armhole' },
      { k: 'Finish', v: 'Enzyme washed, pressed' },
      { k: 'Sizes', v: '38–44' },
    ],
  },
  {
    id: 'm5',
    image: '/img/products/m5.jpg',
    alt: 'MSP Sports bonded knitted jacket, colour range flat-laid',
    brand: BRANDS.MSP,
    name: 'Ashlar Knitted Jacket',
    spec: '480 GSM bonded double-knit',
    plate: 'Plate 10 — bonded knit',
    retail: 3150,
    whole: 1780,
    moq: 48,
    category: 'jacket',
    fabric: 'double-knit',
    gsm: 480,
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'Charcoal', hex: '#45423d' },
      { name: 'Navy', hex: '#2b3a55' },
      { name: 'Moss', hex: '#5b6a52' },
    ],
    tags: ['jacket', 'bonded', 'zip', 'outerwear', 'winter', 'heavy', 'double knit'],
    copy: 'A 480 GSM double-knit bonded to a light tricot backing, so it holds a jacket shape without any interlining. Full-length zip, two welt pockets, and a stand collar cut in one with the body.',
    specs: [
      { k: 'Fabric', v: '480 GSM double-knit bonded to tricot' },
      { k: 'Zip', v: 'Full length coil, wind flap behind' },
      { k: 'Pockets', v: 'Two welt, bar-tacked' },
      { k: 'Finish', v: 'Steam set, no interlining' },
      { k: 'Sizes', v: 'S–XXL' },
    ],
  },
]

export const FEATURED_IDS = ['z1', 'z3', 'm1', 'm5']

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id)

/* Sizes now live on the product. Kept as a function because every caller uses
   it, and it still guards against a missing product. */
export const sizesFor = (product) => product?.sizes ?? SIZES_STANDARD

export const INR = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

/* ---------------------------------------------------------------- searching */

const haystack = (p) =>
  [
    p.name,
    p.brand,
    p.spec,
    p.copy,
    p.category,
    p.fabric,
    p.gsm ? `${p.gsm} gsm` : '',
    ...p.tags,
    ...p.colors.map((c) => c.name),
    ...p.specs.map((s) => `${s.k} ${s.v}`),
  ]
    .join(' ')
    .toLowerCase()

/* Every term has to appear somewhere, so "heavy hoodie" narrows rather than
   widens. Plain substring matching: with ten styles, anything cleverer would
   be harder to predict than it is useful. */
export const matchesQuery = (product, query) => {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return true
  const text = haystack(product)
  return terms.every((t) => text.includes(t))
}

/* ------------------------------------------------------------------ sorting */

export const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price, low to high' },
  { key: 'price-desc', label: 'Price, high to low' },
  { key: 'gsm-desc', label: 'Heaviest first' },
]

export const sortProducts = (list, key, priceOf) => {
  const out = [...list]
  switch (key) {
    case 'price-asc':
      return out.sort((a, b) => priceOf(a) - priceOf(b))
    case 'price-desc':
      return out.sort((a, b) => priceOf(b) - priceOf(a))
    case 'gsm-desc':
      /* Socks carry no GSM, so they settle at the end rather than at zero. */
      return out.sort((a, b) => (b.gsm ?? -1) - (a.gsm ?? -1))
    default:
      return out
  }
}
