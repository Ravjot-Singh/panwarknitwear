import { useRef, useState } from 'react'
import Reveal from '../../components/ui/Reveal'
import ComicPanel from '../../components/ui/ComicPanel'
import Chip from '../../components/ui/Chip'
import Field from '../../components/ui/Field'
import {
  REVIEWS,
  FIT_OPTIONS,
  DELIVERY_OPTIONS,
  RATING_LABELS,
} from '../../data/reviews'
import './feedback.css'

export default function Feedback() {
  const formRef = useRef(null)
  const [rating, setRating] = useState(0)
  const [fit, setFit] = useState('True to chart')
  const [delivery, setDelivery] = useState('On time, well packed')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const f = formRef.current
    const ok =
      rating > 0 && f.elements.name.value.trim() && f.elements.review.value.trim()
    if (!ok) {
      setError(true)
      return
    }
    setError(false)
    setSent(true)
  }

  const reset = () => {
    setSent(false)
    setRating(0)
  }

  return (
    <div className="pk-shell pk-feedback">
      <Reveal as="div" className="pk-eyebrow">
        Feedback
      </Reveal>
      <Reveal as="h1" className="pk-h1" style={{ maxWidth: '26ch', marginBottom: 14 }} delay={60}>
        Tell us how it fits, wears and arrives.
      </Reveal>
      <Reveal as="p" className="pk-lede" delay={110}>
        Fit notes go to the pattern master; packaging notes go to dispatch. Both change the
        next run, not just the reply you get.
      </Reveal>

      <div className="pk-feedback__grid">
        <div>
          {sent ? (
            <ComicPanel className="pk-note">
              <div className="pk-note__body">
                <h2 className="pk-note__head">Logged — thank you.</h2>
                <p className="pk-note__copy" style={{ marginBottom: 22 }}>
                  Your review goes up once we've matched it to the order. If you flagged a
                  fit issue, the pattern master will write to you directly.
                </p>
                <button type="button" className="pk-btn pk-btn--ghost" onClick={reset}>
                  Write another
                </button>
              </div>
            </ComicPanel>
          ) : (
            <Reveal>
              <form ref={formRef} onSubmit={handleSubmit} className="pk-fbform" noValidate>
                <div>
                  <div className="pk-fblabel">Overall</div>
                  <div className="pk-stars">
                    <div className="pk-stars__row">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          className={['pk-star', n <= rating ? 'is-on' : ''].filter(Boolean).join(' ')}
                          onClick={() => setRating(n)}
                          aria-label={`${n} star${n === 1 ? '' : 's'}`}
                          aria-pressed={n <= rating}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <span className="pk-stars__label">{RATING_LABELS[rating]}</span>
                  </div>
                </div>

                <div>
                  <div className="pk-fblabel">Fit against the size chart</div>
                  <div className="pk-chiprow">
                    {FIT_OPTIONS.map((f) => (
                      <Chip key={f} label={f} active={fit === f} onClick={() => setFit(f)} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="pk-fblabel">Delivery &amp; packaging</div>
                  <div className="pk-chiprow">
                    {DELIVERY_OPTIONS.map((d) => (
                      <Chip
                        key={d}
                        label={d}
                        accent="var(--pk-moss)"
                        active={delivery === d}
                        onClick={() => setDelivery(d)}
                      />
                    ))}
                  </div>
                </div>

                <div className="pk-fieldrow">
                  <Field label="Name" name="name" required />
                  <Field label="Order number (optional)" name="order" />
                </div>

                <Field
                  label="Your review"
                  as="textarea"
                  name="review"
                  rows={5}
                  required
                  placeholder="Fabric hand, wash behaviour, sleeve length, how the carton arrived…"
                />

                {error ? (
                  <p className="pk-error">
                    Add a star rating, your name and a few words of review.
                  </p>
                ) : null}

                <button type="submit" className="pk-btn" style={{ alignSelf: 'flex-start' }}>
                  Submit feedback
                </button>
              </form>
            </Reveal>
          )}
        </div>

        <aside>
          <Reveal as="div" className="pk-fblabel" style={{ marginBottom: 22 }}>
            Recent, unedited
          </Reveal>
          <div className="pk-reviews">
            {REVIEWS.map((r, i) => (
              <ComicPanel key={r.who} flat className="pk-review" delay={i * 90}>
                <div className="pk-review__body">
                  <div className="pk-review__top">
                    <span className="pk-review__stars">{r.stars}</span>
                    <span className="pk-review__date">{r.date}</span>
                  </div>
                  <p className="pk-review__text">
                    <em>{r.text}</em>
                  </p>
                  <div className="pk-review__who">
                    {r.who} · {r.item}
                  </div>
                </div>
              </ComicPanel>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
