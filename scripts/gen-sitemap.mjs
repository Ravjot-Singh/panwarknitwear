/* Writes dist/sitemap.xml from the route table and the product list.

   Generated rather than hand-maintained because the ten product URLs come from
   src/data/products.js — a hand-written sitemap would go stale the first time a
   style is added. Both this and the route table are plain ESM with no JSX, so
   Node can import them directly with no build step. */

import { writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { SITE_URL, ROUTE_SEO, absolute } from '../src/data/seo.js'
import { PRODUCTS } from '../src/data/products.js'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const today = new Date().toISOString().slice(0, 10)

const entries = [
  ...Object.values(ROUTE_SEO)
    .filter((entry) => !entry.noindex && entry.path !== '/404')
    .map((entry) => ({
      loc: entry.path === '/' ? SITE_URL + '/' : absolute(entry.path),
      priority: entry.path === '/' ? '1.0' : '0.8',
    })),
  ...PRODUCTS.map((product) => ({
    loc: absolute(`/product/${product.id}`),
    priority: '0.7',
  })),
]

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map(
    ({ loc, priority }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
  ),
  '</urlset>',
  '',
].join('\n')

writeFileSync(join(dist, 'sitemap.xml'), xml)
console.log(`sitemap: ${entries.length} urls`)
