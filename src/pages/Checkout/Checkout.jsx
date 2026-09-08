import { useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import Field from '../../components/ui/Field'
import { useCart } from '../../context/CartContext'
import { SHIPPING_METHODS } from '../../data/shipping'
import Seo from '../../components/seo/Seo'
import { ROUTE_SEO } from '../../data/seo'
import './checkout.css'

const STEP_LABELS = ['Details', 'Delivery', 'Payment']

/* Per-field rules rather than a bare "is it empty" sweep. The form is
   noValidate, so the browser checks nothing — a malformed email or a
   four-digit PIN used to sail through untouched. Each rule reports which field
   failed so the error can be shown against it and focus can move there. */
const STEP1_FIELDS = [
  { name: 'name', label: 'Full name' },
  {
    name: 'phone',
    label: 'Phone',
    /* Indian mobile: 10 digits starting 6–9, tolerating +91, 0, spaces and
       dashes as people actually type them. */
    test: (v) => /^(?:\+?91[\s-]?|0)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '')),
    message: 'Enter a 10-digit Indian mobile number.',
  },
  {
    name: 'email',
    label: 'Email',
    test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
    message: 'Enter a valid email address.',
  },
  { name: 'address', label: 'Address' },
  { name: 'city', label: 'City' },
  {
    name: 'pin',
    label: 'PIN code',
    test: (v) => /^[1-9]\d{5}$/.test(v.replace(/\s/g, '')),
    message: 'Enter a 6-digit PIN code.',
  },
  {
    name: 'gstin',
    label: 'GSTIN',
    optional: true,
    /* 15 characters: 2 state code, then the 10-character PAN (5 letters, 4
       digits, 1 letter), then the entity number, a literal Z, and a checksum
       character. */
    test: (v) =>
      /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/i.test(v.replace(/\s/g, '')),
    message: 'That does not look like a 15-character GSTIN.',
  },
]

/* Returns { field, message } for the first problem, or null. */
function validateStep1(form) {
  for (const f of STEP1_FIELDS) {
    const el = form.elements[f.name]
    if (!el) continue
    const value = el.value.trim()

    if (!value) {
      if (f.optional) continue
      return { field: f.name, message: `${f.label} is required.` }
    }
    if (f.test && !f.test(value)) {
      return { field: f.name, message: f.message }
    }
  }
  return null
}

export default function Checkout() {
  const { lines, count, totals, clear, shipping, setShipping } = useCart()
  const navigate = useNavigate()
  const formRef = useRef(null)

  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [badField, setBadField] = useState('')

  /* Nothing to check out — bounce back to the bag. */
  if (count === 0) return <Navigate to="/cart" replace />

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const fail = (message, field = '') => {
    setError(message)
    setBadField(field)
    if (field) {
      const el = formRef.current?.elements[field]
      if (el) {
        el.focus()
        el.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
    }
  }

  const pass = () => {
    setError('')
    setBadField('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = formRef.current

    if (step < 3) {
      if (step === 1) {
        const problem = validateStep1(form)
        if (problem) return fail(problem.message, problem.field)
      }
      /* Steps 2 and 3 both open with a checked radio, so there is nothing that
         can be left blank — the terms box on step 3 is checked at submit. */
      pass()
      setStep(step + 1)
      toTop()
      return
    }

    if (form.elements.terms && !form.elements.terms.checked) {
      return fail('Please accept the return and made-to-order terms.', 'terms')
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
    pass()
    setStep(step - 1)
    toTop()
  }

  return (
    <div className="pk-shell pk-checkout">
      <Seo {...ROUTE_SEO['/checkout']} />

      {/* The page's only heading, so it has to be the h1 — every other page
          has one, and this one had none. .pk-eyebrow already zeroes its own
          margins, so the element change is purely semantic. */}
      <Reveal as="h1" className="pk-eyebrow">
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
                <Field
                  label="Full name"
                  name="name"
                  autoComplete="name"
                  required
                  invalid={badField === 'name'}
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  invalid={badField === 'phone'}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  invalid={badField === 'email'}
                />
                <Field
                  label="GSTIN (optional)"
                  name="gstin"
                  invalid={badField === 'gstin'}
                />
              </div>
              <div className="pk-fieldrow" style={{ marginTop: 18 }}>
                <Field
                  label="Address"
                  name="address"
                  autoComplete="street-address"
                  wide
                  required
                  invalid={badField === 'address'}
                />
                <Field
                  label="City"
                  name="city"
                  autoComplete="address-level2"
                  required
                  invalid={badField === 'city'}
                />
                <Field
                  label="PIN code"
                  name="pin"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  required
                  invalid={badField === 'pin'}
                />
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

              {/* Controlled by cart state, so choosing express actually moves
                  the total in the summary alongside. */}
              <div className="pk-optionlist">
                {SHIPPING_METHODS.map((m) => (
                  <label className="pk-radio" key={m.id}>
                    <input
                      type="radio"
                      name="ship"
                      value={m.id}
                      checked={shipping === m.id}
                      onChange={() => setShipping(m.id)}
                    />
                    <span>
                      <b>{m.name}</b>
                      <small>{m.blurb}</small>
                    </span>
                    <span className="pk-num">{m.label}</span>
                  </label>
                ))}
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
              {/* Said before the button is pressed, not after — this build has
                  no payment gateway, and the visitor should know that while
                  they still have the choice. */}
              <p className="pk-checkout__note pk-demo-note">
                This is a demonstration build with no payment gateway connected. Placing
                the order will not charge you and will not create a real order.
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

              <label
                className={['pk-terms', badField === 'terms' ? 'is-invalid' : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                <input
                  type="checkbox"
                  name="terms"
                  aria-invalid={badField === 'terms' || undefined}
                />
                <span>
                  I accept the return window of 7 days on retail orders, and that
                  made-to-order wholesale runs are non-returnable once knitting has
                  started.
                </span>
              </label>
            </Reveal>
          </div>

          {/* Kept in the tree so a screen reader announces the message when it
              appears, instead of the node arriving unannounced. */}
          <p className="pk-error" role="alert" hidden={!error}>
            {error}
          </p>

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
            <span>Delivery — {totals.shipMethod.name}</span>
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
