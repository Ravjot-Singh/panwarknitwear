import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import Chip from '../../components/ui/Chip'
import ProductCard from '../../components/product/ProductCard'
import { useCart } from '../../context/CartContext'
import {
  PRODUCTS,
  BRANDS,
  CATEGORIES,
  FABRIC_FAMILIES,
  SORTS,
  matchesQuery,
  sortProducts,
} from '../../data/products'
import Seo from '../../components/seo/Seo'
import { ROUTE_SEO, breadcrumbJsonLd } from '../../data/seo'
import './collection.css'

const LABELS = [
  { key: 'all', label: 'All styles' },
  { key: BRANDS.ZONIXA, label: 'ZONIXA' },
  { key: BRANDS.MSP, label: 'MSP Sports', accent: 'var(--pk-moss)' },
]

/* Every control is URL-synced, so a filtered view is shareable and the back
   button steps through the refinements the shopper actually made. */
export default function Collection() {
  const [params, setParams] = useSearchParams()
  const { mode, setMode, priceOf } = useCart()

  const label = params.get('label') || 'all'
  const category = params.get('cat') || 'all'
  const fabric = params.get('fabric') || 'all'
  const sort = params.get('sort') || 'featured'
  const query = params.get('q') || ''

  /* A ?mode=wholesale link (footer, hero button) switches pricing on arrival. */
  const modeParam = params.get('mode')
  useEffect(() => {
    if (modeParam === 'wholesale' || modeParam === 'retail') {
      setMode(modeParam)
    }
  }, [modeParam, setMode])

  /* One writer for the whole toolbar: set a value, or drop the key when it
     returns to its default so the URL never carries redundant state. */
  const update = (key, value, fallback = 'all') => {
    const next = new URLSearchParams(params)
    if (!value || value === fallback) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const visible = sortProducts(
    PRODUCTS.filter(
      (p) =>
        (label === 'all' || p.brand === label) &&
        (category === 'all' || p.category === category) &&
        (fabric === 'all' || p.fabric === fabric) &&
        matchesQuery(p, query)
    ),
    sort,
    priceOf
  )

  /* Only offer categories and fabrics that exist in the catalogue. */
  const categories = CATEGORIES.filter((c) => PRODUCTS.some((p) => p.category === c.key))
  const fabrics = FABRIC_FAMILIES.filter((f) => PRODUCTS.some((p) => p.fabric === f.key))

  const filtered = label !== 'all' || category !== 'all' || fabric !== 'all' || query

  const clearAll = () => {
    const next = new URLSearchParams(params)
    ;['label', 'cat', 'fabric', 'q'].forEach((k) => next.delete(k))
    setParams(next, { replace: true })
  }

  return (
    <div className="pk-shell pk-collection">
      {/* The canonical stays bare /collection — the query string is filter
          state, not distinct pages. */}
      <Seo
        {...ROUTE_SEO['/collection']}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Collection', path: '/collection' },
        ])}
      />

      <Reveal as="div" className="pk-eyebrow">
        The collection
      </Reveal>
      <Reveal as="h1" className="pk-h1" style={{ maxWidth: '24ch' }} delay={60}>
        Ten styles, two labels, one finishing floor.
      </Reveal>
      <Reveal as="p" className="pk-lede" delay={110}>
        Retail prices include GST. Switch to wholesale in the header for per-piece rates
        against minimum order quantity — sampling is free on orders above 300 pieces.
      </Reveal>

      <Reveal className="pk-toolbar" delay={150}>
        <div className="pk-toolbar__group">
          {LABELS.map((f) => (
            <Chip
              key={f.key}
              label={f.label}
              accent={f.accent}
              active={label === f.key}
              onClick={() => update('label', f.key)}
            />
          ))}
        </div>

        <div className="pk-toolbar__group">
          <label className="pk-search">
            <span className="pk-sr-only">Search the collection</span>
            <input
              type="search"
              value={query}
              placeholder="Search fabric, GSM, style…"
              onChange={(e) => update('q', e.target.value, '')}
            />
          </label>

          <label className="pk-sortsel">
            <span className="pk-sr-only">Sort by</span>
            <select value={sort} onChange={(e) => update('sort', e.target.value, 'featured')}>
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Reveal>

      <Reveal className="pk-refine" delay={180}>
        <div className="pk-refine__row">
          <span className="pk-refine__label">Garment</span>
          <div className="pk-toolbar__group">
            <Chip
              label="Any"
              active={category === 'all'}
              onClick={() => update('cat', 'all')}
            />
            {categories.map((c) => (
              <Chip
                key={c.key}
                label={c.label}
                active={category === c.key}
                onClick={() => update('cat', c.key)}
              />
            ))}
          </div>
        </div>

        <div className="pk-refine__row">
          <span className="pk-refine__label">Fabric</span>
          <div className="pk-toolbar__group">
            <Chip
              label="Any"
              active={fabric === 'all'}
              onClick={() => update('fabric', 'all')}
            />
            {fabrics.map((f) => (
              <Chip
                key={f.key}
                label={f.label}
                active={fabric === f.key}
                onClick={() => update('fabric', f.key)}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Announced, so a screen-reader user learns the list changed after
          typing or filtering rather than only seeing it. */}
      <Reveal className="pk-collection__count" delay={200}>
        <p role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'style' : 'styles'}
          {query ? ` matching “${query}”` : ''}
        </p>
        {filtered ? (
          <button type="button" className="pk-quiet" onClick={clearAll}>
            Clear filters
          </button>
        ) : null}
      </Reveal>

      {visible.length ? (
        /* key on the whole query so cards re-run their fade when the list
           changes */
        <div className="pk-pgrid" key={`${label}-${category}-${fabric}-${sort}-${query}-${mode}`}>
          {visible.map((p, i) => (
            /* h2: these cards sit directly under the page h1, with no section
               heading between them. */
            <ProductCard key={p.id} product={p} delay={i * 60} headingLevel={2} />
          ))}
        </div>
      ) : (
        <div className="pk-collection__empty">
          <h2 className="pk-collection__emptyhead">Nothing on the floor matches that.</h2>
          <p>
            Try a broader term — a fabric like <em>fleece</em>, a weight like{' '}
            <em>380</em>, or a garment like <em>hoodie</em>.
          </p>
          <button type="button" className="pk-btn pk-btn--ghost" onClick={clearAll}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
