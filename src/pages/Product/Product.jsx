import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import Chip from '../../components/ui/Chip'
import Stepper from '../../components/ui/Stepper'
import KnitPlate from '../../components/product/KnitPlate'
import ProductCard from '../../components/product/ProductCard'
import ColorPicker from '../../components/product/ColorPicker'
import SaveButton from '../../components/product/SaveButton'
import SizeGuide from '../../components/product/SizeGuide'
import NotFound from '../NotFound/NotFound'
import Seo from '../../components/seo/Seo'
import { productSeo, productJsonLd, breadcrumbJsonLd } from '../../data/seo'
import { useCart } from '../../context/CartContext'
import { getProduct, sizesFor, INR, PRODUCTS } from '../../data/products'
import { guideFor } from '../../data/sizeGuide'
import './product.css'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isWholesale, priceOf, add } = useCart()

  const product = getProduct(id)
  const sizes = sizesFor(product)

  const [size, setSize] = useState(() => (sizes.includes('M') ? 'M' : sizes[0]))
  const [color, setColor] = useState(() => product?.colors?.[0]?.name ?? null)
  const [qty, setQty] = useState(1)
  const [guideOpen, setGuideOpen] = useState(false)
  /* Named explicitly so closing the guide always returns focus here. */
  const guideBtnRef = useRef(null)

  /* Wholesale opens at MOQ and steps by the dozen; retail steps by one. */
  useEffect(() => {
    if (!product) return
    setSize(sizes.includes('M') ? 'M' : sizes[0])
    setColor(product.colors?.[0]?.name ?? null)
    setQty(isWholesale ? product.moq : 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id, isWholesale])

  /* An unknown id is genuinely not found — redirecting to /collection served a
     200 for a dead URL, which reads as a soft 404 to a crawler. */
  if (!product) return <NotFound />

  const step = isWholesale ? 12 : 1
  const priceLabel = INR(priceOf(product)) + (isWholesale ? ' /pc' : '')
  const subLabel = isWholesale
    ? `MOQ ${product.moq} pieces · ex-GST`
    : 'Incl. GST · free delivery'

  const hasGuide = Boolean(guideFor(product.category))

  /* Same label, then same category — so a hoodie suggests other hoodies before
     it reaches across the catalogue. */
  const related = PRODUCTS.filter((p) => p.id !== product.id)
    .map((p) => ({
      p,
      score: (p.brand === product.brand ? 2 : 0) + (p.category === product.category ? 3 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.p)

  const handleAdd = () => {
    add(product, size, qty)
    navigate('/cart')
  }

  return (
    <div className="pk-shell pk-product">
      <Seo
        {...productSeo(product)}
        jsonLd={[
          productJsonLd(product),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Collection', path: '/collection' },
            { name: product.name, path: `/product/${product.id}` },
          ]),
        ]}
      />

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
          {/* Generated knit swatches, not alternate photography. Captioned as
              such so a sighted visitor does not read them as extra photos of
              the garment and try to click through; hidden from assistive tech
              because they carry no information. */}
          <div className="pk-product__swatchlabel" aria-hidden="true">
            Knit structure — illustrative
          </div>
          <div className="pk-product__thumbs" aria-hidden="true">
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

          {product.colors?.length ? (
            <Reveal delay={165}>
              <div className="pk-product__label">
                Colour <span className="pk-product__chosen">{color}</span>
              </div>
              <ColorPicker colors={product.colors} value={color} onChange={setColor} />
            </Reveal>
          ) : null}

          <Reveal delay={180}>
            <div className="pk-product__label pk-product__label--row">
              <span>Size</span>
              {hasGuide ? (
                <button
                  type="button"
                  className="pk-product__guidelink"
                  ref={guideBtnRef}
                  onClick={() => setGuideOpen(true)}
                >
                  Size guide
                </button>
              ) : null}
            </div>
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
            <SaveButton product={product} />
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

      {related.length ? (
        <section className="pk-product__related" aria-labelledby="pk-related-head">
          <Reveal as="h2" className="pk-product__relatedhead" id="pk-related-head">
            More from the floor
          </Reveal>
          <div className="pk-pgrid">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 60} headingLevel={3} />
            ))}
          </div>
        </section>
      ) : null}

      {guideOpen ? (
        <SizeGuide
          category={product.category}
          sizes={sizes}
          returnFocusTo={guideBtnRef}
          onClose={() => setGuideOpen(false)}
        />
      ) : null}
    </div>
  )
}
