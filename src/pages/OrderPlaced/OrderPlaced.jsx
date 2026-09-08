import { Link, useLocation } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import Seo from '../../components/seo/Seo'
import { ROUTE_SEO } from '../../data/seo'
import './order-placed.css'

export default function OrderPlaced() {
  const { state } = useLocation()
  /* Reaching this page directly (a refresh, a bookmark) still reads sensibly. */
  const orderNo = state?.orderNo || 'PK-000000'

  return (
    <div className="pk-shell pk-done">
      <Seo {...ROUTE_SEO['/order-placed']} />

      <Reveal as="div" className="pk-eyebrow">
        Order placed
      </Reveal>
      <Reveal as="h1" className="pk-done__head" delay={70}>
        On the floor. We'll confirm the run within a working day.
      </Reveal>
      <Reveal as="p" className="pk-done__body" delay={130}>
        Order <strong>{orderNo}</strong> is with our dispatch desk. A proforma and a
        knitting date follow by email — reply on that thread for any size or print change
        while the order is still open.
      </Reveal>
      {/* No payment was taken and no order exists: this flow is a front-end
          demonstration, and saying otherwise would be a lie the visitor might
          act on. */}
      <Reveal as="p" className="pk-done__body pk-demo-note" delay={170}>
        This is a demonstration build. No payment was taken, no order was placed, and
        the number above was generated for display. To order for real, call the unit on
        one of the numbers in the footer.
      </Reveal>
      <Reveal className="pk-row" delay={190}>
        <Link to="/collection" className="pk-btn">
          Keep browsing
        </Link>
        <Link to="/feedback" className="pk-btn pk-btn--ghost">
          Leave feedback
        </Link>
      </Reveal>
    </div>
  )
}
