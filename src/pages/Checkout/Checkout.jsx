import { useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import Field from '../../components/ui/Field'
import { useCart } from '../../context/CartContext'
import './checkout.css'

const STEP_LABELS = ['Details', 'Delivery', 'Payment']
const STEP1_REQUIRED = ['name', 'phone', 'email', 'address', 'city', 'pin']

export default function Checkout() {
  const { lines, count, totals, clear } = useCart()
  const navigate = useNavigate()
  const formRef = useRef(null)

  const [step, setStep] = useState(1)
  const [error, setError] = useState('')

  /* Nothing to check out — bounce back to the bag. */
  if (count === 0) return <Navigate to="/cart" replace />

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = formRef.current

    if (step < 3) {
      const need = step === 1 ? STEP1_REQUIRED : []
      const missing = need.filter(
        (n) => !form.elements[n] || !form.elements[n].value.trim()
      )
      if (missing.length) {
        setError('Please complete every required field before continuing.')
        return
      }
      setError('')
      setStep(step + 1)
      toTop()
      return
    }

    if (form.elements.terms && !form.elements.terms.checked) {
      setError('Please accept the return and made-to-order terms.')
      return
    }

    const orderNo = 'PK-' + Math.floor(100000 + Math.random() * 899999)
    clear()
    navigate('/order-placed', { state: { orderNo } })
  }

  const back = () => {
    if (step === 1) {
      navigate('/cart')
      return
    }
    setError('')
    setStep(step - 1)
    toTop()
  }

  return (
    <div className="pk-shell pk-checkout">
      <Reveal as="div" className="pk-eyebrow">
        Checkout
      </Reveal>

      <Reveal className="pk-steps" delay={50}>
        {STEP_LABELS.map((label, i) => {
          const n = i + 1
          const colour =
            step === n ? 'var(--pk-rust)' : step > n ? 'var(--pk-text-3)' : 'var(--pk-muted-4)'
          return (
            <div key={label} className="pk-steps__item" style={{ color: colour }}>
              <span className="pk-steps__n">0{n}</span>
              <span className="pk-steps__label">{label}</span>
            </div>
          )
        })}
      </Reveal>

      <div className="pk-checkout__grid">
        <form ref={formRef} onSubmit={handleSubmit} className="pk-checkout__form" noValidate>
          {/* Every step stays mounted so earlier answers survive navigation;
              only the active one is shown. */}
          <div hidden={step !== 1}>
            <Reveal key="s1">
              <h2 className="pk-checkout__h2">Who it goes to</h2>
              <p className="pk-checkout__note">
                Wholesale orders: add your GSTIN so we can raise a tax invoice against the
                dispatch.
              </p>

              <div className="pk-fieldrow">
                <Field label="Full name" name="name" required />
                <Field label="Phone" name="phone" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="GSTIN (optional)" name="gstin" />
              </div>
              <div className="pk-fieldrow" style={{ marginTop: 18 }}>
                <Field label="Address" name="address" wide required />
                <Field label="City" name="city" required />
                <Field label="PIN code" name="pin" required />
              </div>
            </Reveal>
          </div>

          <div hidden={step !== 2}>
            <Reveal key="s2">
              <h2 className="pk-checkout__h2">How it travels</h2>
              <p className="pk-checkout__note">
                Everything dispatches from the Ludhiana unit. Bulk cartons move by surface
                freight against an LR copy.
              </p>

              <div className="pk-optionlist">
                <label className="pk-radio">
                  <input type="radio" name="ship" value="standard" defaultChecked />
                  <span>
                    <b>Standard surface</b>
                    <small>4–7 working days · tracked</small>
                  </span>
                  <span className="pk-num">₹0</span>
                </label>
                <label className="pk-radio">
                  <input type="radio" name="ship" value="express" />
                  <span>
                    <b>Express air</b>
                    <small>2 working days · metro PINs only</small>
                  </span>
                  <span className="pk-num">₹250</span>
                </label>
                <label className="pk-radio">
                  <input type="radio" name="ship" value="freight" />
                  <span>
                    <b>Bulk freight (wholesale)</b>
                    <small>Carton-wise, freight to pay at destination</small>
                  </span>
                  <span className="pk-num">To pay</span>
                </label>
              </div>

              <div style={{ marginTop: 20 }}>
                <Field label="Dispatch notes (optional)" as="textarea" name="notes" rows={3} />
              </div>
            </Reveal>
          </div>

          <div hidden={step !== 3}>
            <Reveal key="s3">
              <h2 className="pk-checkout__h2">How it settles</h2>
              <p className="pk-checkout__note">
                Retail orders settle in full. Wholesale runs on 30% advance against a
                proforma, balance before dispatch.
              </p>

              <div className="pk-optionlist" style={{ marginBottom: 22 }}>
                <label className="pk-radio pk-radio--tight">
                  <input type="radio" name="pay" value="upi" defaultChecked />
                  <span>
                    <b>UPI</b>
                    <small>Instant confirmation</small>
                  </span>
                </label>
                <label className="pk-radio pk-radio--tight">
                  <input type="radio" name="pay" value="card" />
                  <span>
                    <b>Card</b>
                    <small>Visa, Mastercard, RuPay</small>
                  </span>
                </label>
                <label className="pk-radio pk-radio--tight">
                  <input type="radio" name="pay" value="proforma" />
                  <span>
                    <b>Bank transfer against proforma</b>
                    <small>Wholesale — 30% advance</small>
                  </span>
                </label>
              </div>

              <label className="pk-terms">
                <input type="checkbox" name="terms" />
                <span>
                  I accept the return window of 7 days on retail orders, and that
                  made-to-order wholesale runs are non-returnable once knitting has
                  started.
                </span>
              </label>
            </Reveal>
          </div>

          {error ? <p className="pk-error">{error}</p> : null}

          <div className="pk-row">
            <button type="submit" className="pk-btn">
              {step === 3 ? 'Place order' : 'Continue'}
            </button>
            <button type="button" className="pk-quiet" onClick={back}>
              {step === 1 ? 'Back to bag' : 'Previous step'}
            </button>
          </div>
        </form>

        <Reveal as="aside" className="pk-summary" variant="scale" delay={100}>
          <h2 className="pk-summary__head" style={{ fontSize: 20, marginBottom: 20 }}>
            Your order
          </h2>

          <div className="pk-checkout__lines">
            {lines.map((l) => (
              <div key={l.key} className="pk-checkout__line">
                <span>{l.short}</span>
                <span className="pk-num">{l.total}</span>
              </div>
            ))}
          </div>

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
          <div className="pk-summary__total" style={{ fontSize: 20, paddingBottom: 0 }}>
            <span>Total</span>
            <span className="pk-num">{totals.total}</span>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
