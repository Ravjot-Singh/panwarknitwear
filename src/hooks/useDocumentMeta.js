import { useEffect } from 'react'
import { headTagsFor, graphFor } from '../data/seo'

/* Every node this hook creates is marked, so it only ever owns what it wrote
   and never clobbers a hand-authored tag in index.html. */
const OWNED = 'data-pk-seo'
const JSONLD_SELECTOR = `script[${OWNED}="jsonld"]`

function upsert({ tag, selector, attrs }) {
  const head = document.head
  let node = head.querySelector(selector)

  if (!node) {
    node = document.createElement(tag)
    node.setAttribute(OWNED, '')
    head.appendChild(node)
  }

  for (const [key, value] of Object.entries(attrs)) {
    if (value == null) node.removeAttribute(key)
    else node.setAttribute(key, value)
  }
}

/* Per-route document metadata.

   Two deliberate choices:

   - JSON-LD reuses a single <script> node and overwrites its textContent, so
     scripts can never accumulate across client-side navigations.
   - Nothing is removed on unmount. Remove-then-re-add opens a window in which
     the head is momentarily empty, which a crawler or scraper could sample;
     the next route overwrites instead. */
export function useDocumentMeta(seo) {
  const { title, description, path, canonical, ogImage, ogType, noindex } = seo
  const jsonLd = seo.jsonLd

  /* Serialised so the effect re-runs when the graph's contents change, not
     merely when a fresh array identity is passed in. */
  const graph = JSON.stringify(
    graphFor(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [])
  )

  useEffect(() => {
    const { title: fullTitle, tags } = headTagsFor({
      title,
      description,
      path,
      canonical,
      ogImage,
      ogType,
      noindex,
    })

    document.title = fullTitle
    tags.forEach(upsert)

    let script = document.head.querySelector(JSONLD_SELECTOR)
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute(OWNED, 'jsonld')
      document.head.appendChild(script)
    }
    script.textContent = graph
  }, [title, description, path, canonical, ogImage, ogType, noindex, graph])
}
