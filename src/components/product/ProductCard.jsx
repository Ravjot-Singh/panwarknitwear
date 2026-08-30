import { Link, useNavigate } from 'react-router-dom'
import KnitPlate from './KnitPlate'
import Reveal from '../ui/Reveal'
import { useCart } from '../../context/CartContext'
import { INR, sizesFor } from '../../data/products'
import './product-card.css'

/**
 * Product card. Intentionally plain: a quiet fade-up and a small plate
 * drift on hover, no comic panel — the goods sell themselves.
 */
export default function ProductCard({ product, delay = 0 }) {
  const { isWholesale, priceOf, add } = useCart()
  const navigate = useNavigate()

  const priceLabel = INR(priceOf(product)) + (isWholesale ? ' /pc' : '')
  const subLabel = isWholesale
    ? `MOQ ${product.moq} pieces · ex-GST`
    : 'Incl. GST · free delivery'

  const handleAdd = () => {
    const sizes = sizesFor(product)
    const size = sizes.includes('M') ? 'M' : sizes[0]
    add(product, size, isWholesale ? product.moq : 1)
    navigate('/cart')
  }

  return (
    <Reveal as="article" className="pk-pcard pk-plate" delay={delay}>
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

      <div className="pk-pcard__body">
        <h3 className="pk-pcard__name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="pk-pcard__spec">{product.spec}</p>

        <div className="pk-pcard__foot">
          <span className="pk-pcard__price pk-num">{priceLabel}</span>
          <button type="button" className="pk-pcard__add" onClick={handleAdd}>
            Add
          </button>
        </div>

        <div className="pk-pcard__sub">{subLabel}</div>
      </div>
    </Reveal>
  )
}
