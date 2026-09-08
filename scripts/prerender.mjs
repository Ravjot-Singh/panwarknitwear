/* Bakes each route's <head> into its own HTML file after `vite build`.

   Why this exists: the Vercel rewrite sends every URL to the same index.html,
   so any client that does not run JavaScript sees the *home page's* title and
   description on /about, /product/z1, everywhere. Googlebot renders JS and
   recovers, but social scrapers — WhatsApp, Facebook, LinkedIn, Slack — do
   not, so every shared product link would preview as generic home-page
   boilerplate.

   This writes dist/<route>/index.html with the correct head. React still
   renders the body on the client; only the head is prerendered. Vercel matches
   the filesystem before applying rewrites, so dist/about/index.html wins for
   /about on its own.

   The tag list comes from headTagsFor() in src/data/seo.js — the same function
   the runtime hook uses — so the two cannot drift. */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  ROUTE_SEO,
  productSeo,
  productJsonLd,
  breadcrumbJsonLd,
  graphFor,
  headTagsFor,
} from '../src/data/seo.js'
import { PRODUCTS } from '../src/data/products.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const escapeText = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/* JSON-LD sits inside a <script>, so the only sequence that can break out of
   it is a literal "</". */
const escapeJsonLd = (json) => json.replace(/<\//g, '<\\/')

function serialise(descriptors) {
  return descriptors
    .map(({ tag, attrs }) => {
      const pairs = Object.entries(attrs)
        .filter(([, v]) => v != null)
        .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
        .join(' ')
      return `    <${tag} ${pairs} />`
    })
    .join('\n')
}

/* Every route to bake: the indexable static pages plus one per product. The
   noindex routes are skipped — they are session state, never shared, and the
   runtime hook still sets their tags in the browser. */
const routes = [
  ...Object.values(ROUTE_SEO)
    .filter((entry) => !entry.noindex && entry.path !== '/404')
    .map((entry) => ({ seo: entry, jsonLd: staticJsonLd(entry) })),
  ...PRODUCTS.map((product) => ({
    seo: productSeo(product),
    jsonLd: [
      productJsonLd(product),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Collection', path: '/collection' },
        { name: product.name, path: `/product/${product.id}` },
      ]),
    ],
  })),
]

function staticJsonLd(entry) {
  if (entry.path === '/') return []
  const name = entry.title.split(' — ')[0]
  return [
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name, path: entry.path },
    ]),
  ]
}

const template = readFileSync(join(dist, 'index.html'), 'utf8')

function render(seo, jsonLd) {
  const { title, tags } = headTagsFor(seo)
  const graph = JSON.stringify(graphFor(jsonLd))

  /* Strip the template's fallbacks before injecting the route's own tags.
     Leaving them in place is worse than useless: a scraper that finds two
     og:title tags takes the first, which would be the home page's — exactly
     the bug this script exists to fix. */
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`)
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace(
      /\s*<meta\b[^>]*?(?:property="og:[^"]*"|name="twitter:[^"]*")[^>]*?\/>/g,
      ''
    )

  const head = [
    serialise(tags),
    `    <script type="application/ld+json">${escapeJsonLd(graph)}</script>`,
  ].join('\n')

  return html.replace('</head>', `${head}\n  </head>`)
}

let written = 0
for (const { seo, jsonLd } of routes) {
  const html = render(seo, jsonLd)

  if (seo.path === '/') {
    writeFileSync(join(dist, 'index.html'), html)
    written += 1
    continue
  }

  /* Written twice on purpose, because static hosts disagree about which form
     answers an extensionless URL:

       dist/about/index.html — the portable convention (nginx, S3, Netlify,
         Cloudflare Pages, GitHub Pages), but a server whose SPA fallback runs
         before directory-index resolution answers /about from the root
         index.html and never reaches it. `vite preview` does exactly that.
       dist/about.html — clean-URL resolution, which Vercel and vite preview
         both apply to /about directly.

     Both come from the same render() call in the same iteration, so they
     cannot drift. */
  mkdirSync(join(dist, seo.path), { recursive: true })
  writeFileSync(join(dist, seo.path, 'index.html'), html)
  writeFileSync(join(dist, `${seo.path}.html`), html)
  written += 1
}

/* Portable for hosts that serve a top-level 404.html. Vercel's catch-all
   rewrite means it never uses this, but it costs nothing. */
writeFileSync(
  join(dist, '404.html'),
  render(ROUTE_SEO['/404'], [])
)

console.log(`prerender: ${written} routes + 404.html`)
