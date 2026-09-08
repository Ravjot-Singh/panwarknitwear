/* SEO copy, head-tag descriptors and structured data.

   This module is the single source of truth for everything that ends up in
   <head>. It is imported by two consumers that must never drift apart:

     - src/hooks/useDocumentMeta.js  upserts the descriptors into the live DOM
     - scripts/prerender.mjs        serialises the same descriptors to HTML

   Keep it free of JSX and of anything browser-only, because the prerender
   script imports it directly under Node. */

/* Extensions are explicit because scripts/prerender.mjs and
   scripts/gen-sitemap.mjs import this file under Node, whose ESM resolver does
   not guess them the way Vite's does. */
import { CONTACT, SOCIAL, LISTINGS, LABEL_SITES } from './site.js'
import { BRANDS } from './products.js'

/* ---------------------------------------------------------------- constants */

/* The canonical origin, and the one line to change if it ever moves.

   Deliberately the Vercel deployment, NOT panwarknitwear.com: this build is not
   the business's live site, and pointing canonicals, Open Graph URLs and the
   sitemap at the real domain would claim content served by a site this project
   does not control — which is worse for the business than staying separate.
   Everything here is SEO-correct for the origin it actually runs on. */
export const SITE_URL = 'https://panvar-knitwear.vercel.app'

export const SITE_NAME = 'Panwar Knitwear'
export const LOCALE = 'en_IN'
export const THEME_COLOR = '#211e1a' /* --pk-ink from styles/tokens.css */
export const DEFAULT_OG_IMAGE = '/og/og-default.jpg'

/* No verified Twitter/X account, so twitter:site is omitted entirely rather
   than pointed at a guess. The card tags themselves still apply. */
export const TWITTER_HANDLE = null

/* The address, email and prices carried in site.js and products.js are
   placeholder demo data. Visible pages show them as-is, but structured data is
   a machine-readable assertion: a PostalAddress that contradicts the business's
   real Google Maps / JustDial / IndiaMART listings damages local ranking rather
   than helping it, and Google's rich-result policy expects a marked-up price to
   match what a buyer actually pays. So LocalBusiness and Product.offers stay
   off until the data is verified — flip this one constant to turn them on. */
export const PUBLISH_VERIFIED_NAP = false

/* ------------------------------------------------------------------ helpers */

export const absolute = (path) => {
  if (!path) return SITE_URL + DEFAULT_OG_IMAGE
  if (/^https?:\/\//.test(path)) return path
  return SITE_URL + (path.startsWith('/') ? path : '/' + path)
}

export const titleFor = (title) =>
  title ? `${title} — ${SITE_NAME}` : ROUTE_SEO['/'].title

/* Trim to a word boundary so descriptions never end mid-word. */
const clamp = (text, max = 155) => {
  const flat = text.replace(/\s+/g, ' ').trim()
  if (flat.length <= max) return flat
  const cut = flat.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]$/, '') + '…'
}

/* ------------------------------------------------------- per-route metadata */

/* Titles stay under ~60 characters and descriptions land in the 140–160 band.
   Each one carries the geography and intent terms the business actually
   competes on — "Ludhiana", "manufacturer", the fabric and garment words —
   without stuffing them. */

export const ROUTE_SEO = {
  '/': {
    title: 'Panwar Knitwear — T-shirt & Winter Wear Manufacturer, Ludhiana',
    description:
      'Knitting, processing and finishing under one roof in Ludhiana since 1996. Hoodies, fleece, jersey tees and track pants under the ZONIXA and MSP Sports labels.',
    path: '/',
  },
  '/collection': {
    title: 'The Collection — Ten Knitwear Styles',
    description:
      'Ten styles across two labels: loopback and fleece hoodies, combed cotton tees, sweatshirts and track pants. Retail and wholesale per-piece rates, knitted in Ludhiana.',
    path: '/collection',
  },
  '/about': {
    title: 'About — Knitting and Finishing Since 1996',
    description:
      'Sixty-two people, eighteen tonnes of fabric a month, residual shrinkage under 3%. How Panwar Knitwear grew from four frames in one shed to a full finishing floor.',
    path: '/about',
  },
  '/contact': {
    title: 'Contact — Enquiries and Factory Visits',
    description:
      'Talk to Panwar Knitwear in Ludhiana about retail orders, wholesale rates, private label and sampling. Phone, email and factory visits by appointment.',
    path: '/contact',
  },
  '/feedback': {
    title: 'Feedback — Rate Your Order',
    description:
      'Tell us how the fit, fabric and delivery held up. Fit and delivery surveys plus a short review, so we can correct the next run.',
    path: '/feedback',
  },
  /* Saved styles live in this browser's localStorage, so the page has no
     shared content to rank — but it is a real destination a visitor may
     bookmark, so it stays indexable with honest copy rather than noindex. */
  '/wishlist': {
    title: 'Saved Styles',
    description:
      'The knitwear styles you have set aside to come back to, kept in this browser.',
    path: '/wishlist',
  },
  '/cart': {
    title: 'Your Bag',
    description: 'The styles you have selected, with sizes and quantities.',
    path: '/cart',
    noindex: true,
  },
  '/checkout': {
    title: 'Checkout',
    description: 'Details, delivery and payment for your order.',
    path: '/checkout',
    noindex: true,
  },
  '/order-placed': {
    title: 'Order Placed',
    description: 'Your order confirmation.',
    path: '/order-placed',
    noindex: true,
  },
  '/404': {
    title: 'Page Not Found',
    description: 'That page does not exist. Browse the collection instead.',
    path: '/404',
    noindex: true,
  },
}

export const seoFor = (pathname) => ROUTE_SEO[pathname] ?? ROUTE_SEO['/404']

/* Every indexable route, for the sitemap and the prerender pass. */
export const INDEXABLE_ROUTES = Object.values(ROUTE_SEO)
  .filter((entry) => !entry.noindex)
  .map((entry) => entry.path)

/* The product page builds its metadata from the product itself. */
export const productSeo = (product) => ({
  title: `${product.name} — ${product.brand}`,
  description: clamp(`${product.spec}. ${product.copy}`),
  path: `/product/${product.id}`,
  ogImage: product.image,
  ogType: 'product',
})

/* ------------------------------------------------------- structured data */

const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`

/* Only verifiable claims: the name, the site, the logo, and the profiles the
   business genuinely links to. sameAs is the single most useful part of this
   node — it ties the site to the JustDial, IndiaMART, Instagram and label
   properties that already rank. */
export const organizationJsonLd = () => {
  const node = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absolute('/icons/icon-512.png'),
    description:
      'Knitwear manufacturer in Ludhiana, Punjab, producing t-shirts, sweatshirts, hoodies, track pants and shorts under the ZONIXA and MSP Sports labels.',
    brand: [BRANDS.ZONIXA, BRANDS.MSP].map((name) => ({
      '@type': 'Brand',
      name,
    })),
    sameAs: [...SOCIAL, ...LISTINGS, ...LABEL_SITES].map((l) => l.href),
  }

  if (PUBLISH_VERIFIED_NAP) {
    node.telephone = CONTACT.phones.map((p) => p.number)
    node.email = CONTACT.email
  }

  return node
}

/* A LocalBusiness subtype fits the retail-first positioning better than
   Manufacturer. Gated: see PUBLISH_VERIFIED_NAP above. */
export const localBusinessJsonLd = () => {
  if (!PUBLISH_VERIFIED_NAP) return null

  const maps = LISTINGS.find((l) => l.label === 'Google Maps')

  return {
    '@type': 'ClothingStore',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: SITE_URL,
    parentOrganization: { '@id': ORG_ID },
    telephone: CONTACT.phones.map((p) => p.number),
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.addressLines.slice(1, -1).join(', '),
      addressLocality: 'Ludhiana',
      addressRegion: 'Punjab',
      postalCode: '141003',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:30',
        closes: '18:30',
      },
    ],
    areaServed: 'IN',
    ...(maps ? { hasMap: maps.href } : null),
  }
}

/* The SearchAction is now honest: /collection?q= is a real, working search over
   name, brand, fabric, GSM, colourway and spec. It was deliberately omitted
   until the endpoint existed. */
export const webSiteJsonLd = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'en-IN',
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/collection?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
})

/* Deliberately no aggregateRating and no review: src/data/reviews.js holds
   invented reviews from fictional buyers, and marking those up is a
   structured-data policy violation. */
export const productJsonLd = (product) => {
  const find = (key) => product.specs.find((row) => row.k === key)?.v

  const node = {
    '@type': 'Product',
    name: product.name,
    image: absolute(product.image),
    description: clamp(product.copy, 300),
    sku: product.id,
    brand: { '@type': 'Brand', name: product.brand },
    manufacturer: { '@id': ORG_ID },
    url: absolute(`/product/${product.id}`),
  }

  const material = find('Fabric')
  if (material) node.material = material

  node.additionalProperty = product.specs.map((row) => ({
    '@type': 'PropertyValue',
    name: row.k,
    value: row.v,
  }))

  if (PUBLISH_VERIFIED_NAP) {
    node.offers = {
      '@type': 'Offer',
      price: product.retail,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: absolute(`/product/${product.id}`),
      seller: { '@id': ORG_ID },
    }
  }

  return node
}

export const breadcrumbJsonLd = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((step, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: step.name,
    item: absolute(step.path),
  })),
})

/* One @graph per page: the site-wide nodes, plus whatever the page adds. The
   page-specific nodes reference the Organization by @id rather than repeating
   it. */
export const graphFor = (extra = []) => {
  const nodes = [organizationJsonLd(), webSiteJsonLd(), localBusinessJsonLd()]
    .concat(extra)
    .filter(Boolean)

  return { '@context': 'https://schema.org', '@graph': nodes }
}

/* -------------------------------------------------- head tag descriptors */

/* The single definition of which tags exist in <head>. Returns an ordered list
   of { tag, attrs, selector } — the runtime hook upserts by selector, the
   prerender script serialises to HTML. `content` is the value; `selector` is
   how the node is identified so it is updated rather than duplicated. */
export function headTagsFor(seo) {
  const {
    title,
    description,
    path,
    canonical,
    ogImage,
    ogType = 'website',
    noindex = false,
  } = seo

  const url = canonical ?? absolute(path ?? '/')
  const image = absolute(ogImage ?? DEFAULT_OG_IMAGE)
  const fullTitle = title ?? ROUTE_SEO['/'].title

  const meta = (key, keyAttr, content) => ({
    tag: 'meta',
    selector: `meta[${keyAttr}="${key}"]`,
    attrs: { [keyAttr]: key, content },
  })

  const tags = [
    meta('description', 'name', description),
    {
      tag: 'link',
      selector: 'link[rel="canonical"]',
      attrs: { rel: 'canonical', href: url },
    },
    meta('robots', 'name', noindex ? 'noindex, follow' : 'index, follow'),

    meta('og:title', 'property', fullTitle),
    meta('og:description', 'property', description),
    meta('og:type', 'property', ogType),
    meta('og:url', 'property', url),
    meta('og:image', 'property', image),
    meta('og:site_name', 'property', SITE_NAME),
    meta('og:locale', 'property', LOCALE),

    meta('twitter:card', 'name', 'summary_large_image'),
    meta('twitter:title', 'name', fullTitle),
    meta('twitter:description', 'name', description),
    meta('twitter:image', 'name', image),
  ]

  if (TWITTER_HANDLE) tags.push(meta('twitter:site', 'name', TWITTER_HANDLE))

  return { title: fullTitle, tags }
}
