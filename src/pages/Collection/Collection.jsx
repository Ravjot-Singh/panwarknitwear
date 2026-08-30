import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import Chip from '../../components/ui/Chip'
import ProductCard from '../../components/product/ProductCard'
import { useCart } from '../../context/CartContext'
import { PRODUCTS, BRANDS } from '../../data/products'
import './collection.css'

const FILTERS = [
  { key: 'all', label: 'All styles' },
  { key: BRANDS.ZONIXA, label: 'ZONIXA' },
  { key: BRANDS.MSP, label: 'MSP Sports', accent: 'var(--pk-moss)' },
]

export default function Collection() {
  const [params, setParams] = useSearchParams()
  const { mode, setMode, isWholesale } = useCart()

  const filter = params.get('label') || 'all'

  /* A ?mode=wholesale link (footer, hero button) switches pricing on arrival. */
  const modeParam = params.get('mode')
  useEffect(() => {
    if (modeParam === 'wholesale' || modeParam === 'retail') {
      setMode(modeParam)
    }
  }, [modeParam, setMode])

  const setFilter = (key) => {
    const next = new URLSearchParams(params)
    if (key === 'all') next.delete('label')
    else next.set('label', key)
    setParams(next, { replace: true })
  }

  const visible =
    filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.brand === filter)

  return (
    <div className="pk-shell pk-collection">
      <Reveal as="div" className="pk-eyebrow">
        The collection
      </Reveal>
      <Reveal as="h1" className="pk-h1" style={{ maxWidth: '24ch' }} delay={60}>
        Ten styles, two labels, one finishing floor.
      </Reveal>
      <Reveal as="p" className="pk-lede" delay={110}>
        Retail prices include GST. Switch to wholesale for per-piece rates against minimum
        order quantity — sampling is free on orders above 300 pieces.
      </Reveal>

      <Reveal className="pk-toolbar" delay={150}>
        <div className="pk-toolbar__group">
          {FILTERS.map((f) => (
            <Chip
              key={f.key}
              label={f.label}
              accent={f.accent}
              active={filter === f.key}
              onClick={() => setFilter(f.key)}
            />
          ))}
        </div>

        <div className="pk-toolbar__group">
          <Chip label="Retail" active={!isWholesale} onClick={() => setMode('retail')} />
          <Chip
            label="Wholesale"
            active={isWholesale}
            onClick={() => setMode('wholesale')}
          />
        </div>
      </Reveal>

      {/* key on filter+mode so cards re-run their fade when the list changes */}
      <div className="pk-pgrid" key={`${filter}-${mode}`}>
        {visible.map((p, i) => (
          <ProductCard key={p.id} product={p} delay={i * 60} />
        ))}
      </div>
    </div>
  )
}
