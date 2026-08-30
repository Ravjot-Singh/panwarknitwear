import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import Chip from '../../components/ui/Chip'
import Stepper from '../../components/ui/Stepper'
import KnitPlate from '../../components/product/KnitPlate'
import { useCart } from '../../context/CartContext'
import { getProduct, sizesFor, INR } from '../../data/products'
import './product.css'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isWholesale, priceOf, add } = useCart()

  const product = getProduct(id)
  const sizes = sizesFor(product)

  const [size, setSize] = useState(() => (sizes.includes('M') ? 'M' : sizes[0]))
  const [qty, setQty] = useState(1)

  /* Wholesale opens at MOQ and steps by the dozen; retail steps by one. */
  useEffect(() => {
    if (!product) return
    setSize(sizes.includes('M') ? 'M' : sizes[0])
    setQty(isWholesale ? product.moq : 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id, isWholesale])

  if (!product) return <Navigate to="/collection" replace />

  const step = isWholesale ? 12 : 1
  const priceLabel = INR(priceOf(product)) + (isWholesale ? ' /pc' : '')
  const subLabel = isWholesale
    ? `MOQ ${product.moq} pieces · ex-GST`
    : 'Incl. GST · free delivery'

  const handleAdd = () => {
    add(product, size, qty)
    navigate('/cart')
  }

  return (
    <div className="pk-shell pk-product">
      <Reveal>
        <Link to="/collection" className="pk-quiet pk-product__back">
          ← Back to collection
        </Link>
      </Reveal>

      <div className="pk-product__grid">
        <Reveal className="pk-product__media" variant="scale">
          <KnitPlate
            image={product.image}
            alt={product.alt}
            brand={product.brand}
            plate={product.plate}
          />
          {/* Fabric-texture tiles beneath the garment shot. */}
          <div className="pk-product__thumbs">
            <KnitPlate ratio="1 / 1" direction="90deg" />
            <KnitPlate ratio="1 / 1" direction="0deg" />
            <KnitPlate ratio="1 / 1" direction="45deg" />
          </div>
        </Reveal>

        <div>
          <Reveal as="div" className="pk-eyebrow">
            {product.brand}
          </Reveal>
          <Reveal as="h1" className="pk-product__name" delay={60}>
            {product.name}
          </Reveal>

          <Reveal className="pk-product__pricing" delay={100}>
            <span className="pk-product__price pk-num">{priceLabel}</span>
            <span className="pk-product__sub">{subLabel}</span>
          </Reveal>

          <Reveal as="p" className="pk-product__copy" delay={140}>
            {product.copy}
          </Reveal>

          <Reveal delay={180}>
            <div className="pk-product__label">Size</div>
            <div className="pk-product__sizes">
              {sizes.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  size
                  active={size === s}
                  onClick={() => setSize(s)}
                />
              ))}
            </div>
          </Reveal>

          <Reveal className="pk-row pk-product__buy" delay={220}>
            <Stepper
              value={qty}
              onDecrease={() => setQty((q) => Math.max(1, q - step))}
              onIncrease={() => setQty((q) => q + step)}
            />
            <button type="button" className="pk-btn" onClick={handleAdd}>
              Add to cart
            </button>
          </Reveal>

          <div className="pk-spectable">
            {product.specs.map((row, i) => (
              <Reveal key={row.k} className="pk-specrow" delay={260 + i * 55}>
                <span className="pk-specrow__k">{row.k}</span>
                <span className="pk-specrow__v">{row.v}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
