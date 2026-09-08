import { useRef, useState } from 'react'
import Reveal from '../../components/ui/Reveal'
import ComicPanel from '../../components/ui/ComicPanel'
import ComicImage from '../../components/ui/ComicImage'
import Field from '../../components/ui/Field'
import {
  CONTACT,
  LISTINGS,
  SOCIAL,
  LABEL_SITES,
  telHref,
  IMAGES,
} from '../../data/site'
import Seo from '../../components/seo/Seo'
import { ROUTE_SEO, breadcrumbJsonLd } from '../../data/seo'
import './contact.css'

export default function Contact() {
  const formRef = useRef(null)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const f = formRef.current
    const ok = ['name', 'email', 'message'].every(
      (n) => f.elements[n] && f.elements[n].value.trim()
    )
    if (!ok) {
      setError(true)
      return
    }
    setError(false)
    setSent(true)
  }

  return (
    <div className="pk-shell pk-contact">
      <Seo
        {...ROUTE_SEO['/contact']}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <Reveal as="div" className="pk-eyebrow">
        Contact
      </Reveal>
      <Reveal as="h1" className="pk-h1 pk-contact__h1" delay={60}>
        Talk to the floor, not a call centre.
      </Reveal>

      <div className="pk-contact__grid">
        <div>
          {sent ? (
            <ComicPanel className="pk-note">
              <div className="pk-note__body">
                <h2 className="pk-note__head">Received.</h2>
                <p className="pk-note__copy">
                  Enquiries are answered within one working day, Monday to Saturday.
                  Wholesale requests go to the sampling desk with your quantity and
                  fabric.
                </p>
                <p className="pk-note__copy pk-demo-note">
                  This is a demonstration build — the form has no backend, so nothing was
                  actually sent. To reach the unit for real, call one of the numbers in
                  the footer.
                </p>
              </div>
            </ComicPanel>
          ) : (
            <Reveal>
              <form ref={formRef} onSubmit={handleSubmit} className="pk-form" noValidate>
              <div className="pk-fieldrow">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone / WhatsApp" name="phone" />
                <Field label="Enquiry type" as="select" name="kind" defaultValue="Retail order or sizing">
                  <option>Retail order or sizing</option>
                  <option>Wholesale / private label</option>
                  <option>Sampling</option>
                  <option>Something else</option>
                </Field>
              </div>

              <Field
                label="Quantity, fabric, and anything else useful"
                as="textarea"
                name="message"
                rows={5}
                required
              />

              {error ? (
                <p className="pk-error">Please fill in your name, email and message.</p>
              ) : null}

              <button type="submit" className="pk-btn" style={{ alignSelf: 'flex-start' }}>
                Send enquiry
              </button>
              </form>
            </Reveal>
          )}
        </div>

        <div className="pk-contact__aside">
          <Reveal className="pk-block">
            <div className="pk-block__head">The unit</div>
            <p className="pk-block__body">
              {CONTACT.addressLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal className="pk-block" delay={70}>
            <div className="pk-block__head">Direct</div>
            <p className="pk-block__body">
              {CONTACT.phones.map((p) => (
                <span key={p.number}>
                  {p.label} · <a href={telHref(p.number)}>{p.number}</a>
                  <br />
                </span>
              ))}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </Reveal>

          <Reveal className="pk-block" delay={140}>
            <div className="pk-block__head">Hours</div>
            <p className="pk-block__body">
              {CONTACT.hours.map((h) => (
                <span key={h}>
                  {h}
                  <br />
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal className="pk-block" delay={210}>
            <div className="pk-block__head">Find us</div>
            <div className="pk-block__links">
              {[...LISTINGS, ...SOCIAL, ...LABEL_SITES].map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
                  {l.label}
                </a>
              ))}
            </div>
          </Reveal>

          <ComicImage
            src={IMAGES.unit}
            alt="Collared half-sleeve knits packed at the Gill Road unit"
            placeholder="Gill Road unit — packed for dispatch"
            caption="Gill Road, Ludhiana"
            ratio="3 / 2"
            delay={260}
          />
        </div>
      </div>
    </div>
  )
}
