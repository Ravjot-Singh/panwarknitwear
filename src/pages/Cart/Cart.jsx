import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import Stepper from '../../components/ui/Stepper'
import KnitPlate from '../../components/product/KnitPlate'
import { useCart } from '../../context/CartContext'
import Seo from '../../components/seo/Seo'
import { ROUTE_SEO } from '../../data/seo'
import './cart.css'

export default function Cart() {
  const { lines, count, totals, setQty, remove } = useCart()
  const navigate = useNavigate()

  const heading =
    count === 0
      ? 'Your bag is empty'
      : `${count} ${count === 1 ? 'piece' : 'pieces'} in the bag`

  return (
    <div className="pk-shell pk-cart">
      <Seo {...ROUTE_SEO['/cart']} />
      <Reveal as="div" className="pk-eyebrow">
        Bag
      </Reveal>
      <Reveal as="h1" className="pk-h1 pk-cart__head" delay={60}>
        {heading}
      </Reveal>

      {count === 0 ? (
        <Reveal className="pk-cart__empty" delay={110}>
          <p>
            Nothing here yet. The current run has ten styles across both labels — start
            with the loopback hoodie or a jersey three-pack.
          </p>
          <Link to="/collection" className="pk-btn">
            Browse the collection
          </Link>
        </Reveal>
      ) : (
        <div className="pk-cart__grid">
          <div className="pk-cart__lines">
            {lines.map((l, i) => (
              <Reveal key={l.key} className="pk-line" delay={i * 70}>
                <KnitPlate
                  className="pk-line__thumb"
                  image={l.product.image}
                  alt={l.product.alt}
                />
                <div>
                  <div className="pk-line__top">
                    <div>
                      <div className="pk-line__brand">{l.product.brand}</div>
                      <h3 className="pk-line__name">{l.product.name}</h3>
                      <p className="pk-line__meta">{l.meta}</p>
                    </div>
                    <span className="pk-line__total pk-num">{l.total}</span>
                  </div>

                  <div className="pk-line__controls">
                    <Stepper
                      small
                      value={l.qty}
                      onDecrease={() => setQty(l.key, -1)}
                      onIncrease={() => setQty(l.key, 1)}
                    />
                    <button
                      type="button"
                      className="pk-quiet"
                      onClick={() => remove(l.key)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal as="aside" className="pk-summary" variant="scale" delay={120}>
            <h2 className="pk-summary__head">Summary</h2>
            <div className="pk-summary__row">
              <span>Subtotal</span>
              <span className="pk-num">{totals.subtotal}</span>
            </div>
            <div className="pk-summary__row">
              <span>{totals.taxLabel}</span>
              <span className="pk-num">{totals.tax}</span>
            </div>
            <div className="pk-summary__row pk-summary__row--last">
              <span>Delivery</span>
              <span className="pk-num">{totals.ship}</span>
            </div>
            <div className="pk-summary__total">
              <span>Total</span>
              <span className="pk-num">{totals.total}</span>
            </div>
            <button
              type="button"
              className="pk-btn pk-btn--block"
              onClick={() => navigate('/checkout')}
            >
              Checkout
            </button>
            <p className="pk-summary__note">{totals.note}</p>
          </Reveal>
        </div>
      )}
    </div>
  )
}
