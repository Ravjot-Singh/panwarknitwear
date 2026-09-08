import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import KnitPlate from './KnitPlate'
import SaveButton from './SaveButton'
import Reveal from '../ui/Reveal'
import Chip from '../ui/Chip'
import { useCart } from '../../context/CartContext'
import { INR, sizesFor } from '../../data/products'
import './product-card.css'

/**
 * Product card. Intentionally plain: a quiet fade-up and a small plate
 * drift on hover, no comic panel — the goods sell themselves.
 *
 * `headingLevel` exists so the card's name sits at the right depth wherever it
 * is used: on the home page the cards follow an h2 section heading, so h3 is
 * correct, but on /collection they sit directly under the h1 and h3 would skip
 * a level.
 */
export default function ProductCard({ product, delay = 0, headingLevel = 3 }) {
  const { isWholesale, priceOf, add } = useCart()
  const navigate = useNavigate()
  const Heading = `h${headingLevel}`

  /* "Add" used to silently pick M (or the first size) and jump straight to the
     bag, so a shopper never saw what sizes the style came in and could easily
     buy the wrong one. It now opens the size list in place: the convenience of
     a quick add, without choosing on the shopper's behalf. */
  const [picking, setPicking] = useState(false)
  const wrapRef = useRef(null)
  const firstSizeRef = useRef(null)

  const sizes = sizesFor(product)
  const priceLabel = INR(priceOf(product)) + (isWholesale ? ' /pc' : '')
  const subLabel = isWholesale
    ? `MOQ ${product.moq} pieces · ex-GST`
    : 'Incl. GST · free delivery'

  /* A single size (socks are "One size") has nothing to choose, so the popover
     would be a pointless extra tap. */
  const needsChoice = sizes.length > 1

  useEffect(() => {
    if (!picking) return

    firstSizeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') setPicking(false)
    }
    const onPointer = (e) => {
      if (!wrapRef.current?.contains(e.target)) setPicking(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [picking])

  const commit = (size) => {
    add(product, size, isWholesale ? product.moq : 1)
    setPicking(false)
    navigate('/cart')
  }

  const onAdd = () => {
    if (needsChoice) setPicking((v) => !v)
    else commit(sizes[0])
  }

  return (
    <Reveal as="article" className="pk-pcard pk-plate" delay={delay}>
      <div className="pk-pcard__mediawrap">
        <Link
          to={`/product/${product.id}`}
          className="pk-pcard__media"
          aria-label={`View ${product.name}`}
        >
          <KnitPlate
            image={product.image}
            alt={product.alt}
            brand={product.brand}
            plate={product.plate}
          />
        </Link>
        {/* Outside the link, or saving would follow through to the product. */}
        <SaveButton product={product} className="pk-save--onmedia" />
      </div>

      <div className="pk-pcard__body">
        <Heading className="pk-pcard__name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </Heading>
        <p className="pk-pcard__spec">{product.spec}</p>

        {/* Read-only here: the colourways a style comes in, as information.
            Choosing one is a product-page decision. */}
        {product.colors?.length ? (
          <ul className="pk-pcard__colors" aria-label={`${product.colors.length} colours`}>
            {product.colors.slice(0, 5).map((c) => (
              <li key={c.name} style={{ '--pk-dot': c.hex }} title={c.name}>
                <span className="pk-sr-only">{c.name}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="pk-pcard__foot">
          <span className="pk-pcard__price pk-num">{priceLabel}</span>

          <div className="pk-pcard__addwrap" ref={wrapRef}>
            <button
              type="button"
              className="pk-pcard__add"
              onClick={onAdd}
              aria-expanded={needsChoice ? picking : undefined}
              aria-label={
                needsChoice
                  ? `Add ${product.name} — choose a size`
                  : `Add ${product.name}, ${sizes[0]}`
              }
            >
              {picking ? 'Size?' : 'Add'}
            </button>

            {picking ? (
              <div className="pk-pcard__sizes" role="group" aria-label="Choose a size">
                {sizes.map((s, i) => (
                  <Chip
                    key={s}
                    ref={i === 0 ? firstSizeRef : undefined}
                    label={s}
                    size
                    onClick={() => commit(s)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="pk-pcard__sub">{subLabel}</div>
      </div>
    </Reveal>
  )
}
