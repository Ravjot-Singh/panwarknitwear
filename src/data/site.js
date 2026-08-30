/* Company facts and contact details.
   Phone numbers, external profiles and leadership names are carried over
   verbatim from panwarknitwear.com as required by the project brief. */

export const CONTACT = {
  company: 'Panwar Knitwear',
  addressLines: [
    'Panwar Knitwear',
    'Street 4, Industrial Area C',
    'Gill Road, Ludhiana 141003',
    'Punjab, India',
  ],
  shortAddress: 'Gill Road, Ludhiana 141003',
  /* All three numbers as published on the existing site. */
  phones: [
    { label: 'Sales', number: '+91 98760 45457' },
    { label: 'Wholesale', number: '+91 98157 03769' },
    { label: 'Sampling', number: '+91 99999 82998' },
  ],
  email: 'orders@panwarknitwear.in',
  hours: ['Monday–Saturday, 9:30–18:30 IST', 'Factory visits by appointment'],
}

export const telHref = (number) => 'tel:' + number.replace(/\s/g, '')

export const LISTINGS = [
  { label: 'JustDial', href: 'https://jsdl.in/DT-40JPFSTDR23' },
  { label: 'IndiaMart', href: 'https://www.indiamart.com/panwar-knitwear' },
  { label: 'Google Maps', href: 'https://maps.app.goo.gl/rrg4VPdpZcRvZTQZ6' },
]

export const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/panwarknitwear' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/posts/a-rohitash-panwar-7b3684114_panwarknitwear-zonixa-mspsports-activity-7218811071321497600-Dvj6',
  },
  {
    label: 'Quora',
    href: 'https://www.quora.com/What-are-some-good-manufacturers-of-clothing/answer/A-Rohitash-Panwar-3',
  },
]

export const LABEL_SITES = [
  { label: 'zonixa.com', href: 'https://zonixa.com/' },
  { label: 'mspsports.in', href: 'https://mspsports.in/' },
]

export const LEADERSHIP = [
  { name: 'Mohar Singh Panwar', role: 'Founder' },
  { name: 'Prabhu Panwar', role: 'Co-founder & CEO' },
  { name: 'Bhala Ram Panwar', role: 'Co-founder & CEO' },
  { name: 'Rohitash Panwar', role: 'Online presence' },
]

/* Fabrics named on the existing site, kept as-is. */
export const FABRICS = [
  'Spun Fleece',
  'Dry Fit',
  'Honeycomb Lycra',
  '100% Cotton',
  'Cotton Lycra',
  'NS Bonded',
  'Russian Fleece',
  'Sherpa',
]

export const MILESTONES = [
  {
    year: '1996',
    title: 'Four frames, one shed',
    body: 'Single jersey for local wholesalers, sold by the kilo.',
  },
  {
    year: '2007',
    title: 'MSP SPORTS begins',
    body: 'Our own label for jersey tees, socks and shirting — the volume line.',
  },
  {
    year: '2014',
    title: 'Compactor and finishing',
    body: 'Shrinkage came in-house, and stayed under control.',
  },
  {
    year: '2019',
    title: 'ZONIXA',
    body: 'Fleece weights, chest prints and zippers — the fashion side of the floor.',
  },
]

export const BUYER_SERVICES = [
  {
    title: 'Private label',
    body: 'Your labels, tags and packing from 300 pieces per style. Woven or printed, sewn in at the neck or side seam.',
  },
  {
    title: 'Sampling',
    body: 'Fit sample in 6 working days, size set in 10. Free against confirmed orders above 300 pieces.',
  },
  {
    title: 'Lead times',
    body: '18–25 days for jersey, 25–32 for fleece and outerwear, from yarn approval to dispatch.',
  },
]

export const ABOUT_STATS = [
  { value: '1996', label: 'Year one' },
  { value: '62', label: 'People on the floor' },
  { value: '18t', label: 'Fabric knitted / month' },
  { value: '<3%', label: 'Residual shrinkage' },
]

export const CRAFT_STAGES = [
  {
    n: '01',
    title: 'Yarn',
    body: 'Combed ring-spun cotton in 24s, 30s and 40s counts, sourced within Punjab. Every lot is checked for count variation and neps before it reaches the frame.',
  },
  {
    n: '02',
    title: 'Knit',
    body: 'Single jersey, pique, loopback and double-knit on 20- to 28-gauge circular machines. Gauge is set to the fabric, not the schedule — heavier fleece runs slower and drops a truer hand.',
  },
  {
    n: '03',
    title: 'Finish',
    body: 'Compacted and bio-washed to hold size, then cut, pieced with twin-needle seams and pressed by hand. Residual shrinkage is held under 3% after three washes.',
  },
]

/* Editorial imagery is Panwar's own catalogue photography, pulled from the
   existing site. The original's who-we-are / our-craftsmanship / our-leadership
   banners are 500x160 strips — too small for these panels — so the full-size
   garment shots stand in for them. Each slot gets a distinct photograph. */

export const JOURNAL = [
  {
    id: 'j1',
    kicker: 'Care · 4 min',
    title: 'How to wash fleece without flattening the pile',
    body: 'Cold water, inside out, no fabric softener. Softener coats the brushed loop and kills the loft in about six washes.',
    image: '/img/editorial/shape.jpg',
    alt: 'Brushed fleece hoodies flat-laid in a colour range',
  },
  {
    id: 'j2',
    kicker: 'Fabric · 6 min',
    title: 'Reading GSM: why 180 beats 220 for a summer tee',
    body: 'Weight is not quality. Yarn count, twist and finish decide drape — a 180 GSM 30s combed jersey outperforms a heavy carded one.',
    image: '/img/editorial/print.jpg',
    alt: 'Printed cotton jersey tees flat-laid in a colour range',
  },
  {
    id: 'j3',
    kicker: 'Care · 3 min',
    title: 'Socks: the terry heel, and how to keep it',
    body: 'Air-dry flat. Tumble heat relaxes the elastane in the welt, which is what actually makes a sock slide down.',
    image: '/img/editorial/dora.jpg',
    alt: 'Finished knitwear folded and packed for dispatch',
  },
]

export const IMAGES = {
  hero: '/img/editorial/fleece.jpg',
  craft: '/img/editorial/hood.jpg',
  about: '/img/editorial/sweat.jpg',
  unit: '/img/editorial/collar.jpg',
  feather: '/img/editorial/feather.jpg',
}
