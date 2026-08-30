import { Link } from 'react-router-dom'
import { CONTACT, LISTINGS, SOCIAL, LABEL_SITES, telHref } from '../../data/site'
import './footer.css'

export default function Footer() {
  return (
    <footer className="pk-footer">
      <div className="pk-footer__grid pk-shell">
        <div>
          <div className="pk-footer__brand">Panwar Knitwear</div>
          <p className="pk-footer__blurb">
            Knitting, processing and finishing under one roof in Ludhiana since 1996.
            Home of ZONIXA and MSP SPORTS.
          </p>
        </div>

        <div>
          <div className="pk-footer__head">Pages</div>
          <div className="pk-footer__list">
            <Link to="/">Home</Link>
            <Link to="/collection">Collection</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/feedback">Feedback</Link>
          </div>
        </div>

        <div>
          <div className="pk-footer__head">Labels</div>
          <div className="pk-footer__list">
            <Link to="/collection?label=ZONIXA">ZONIXA</Link>
            <Link to="/collection?label=MSP%20SPORTS">MSP SPORTS</Link>
            <Link to="/collection?mode=wholesale">Wholesale</Link>
            {LABEL_SITES.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer noopener">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="pk-footer__head">Reach us</div>
          <p className="pk-footer__contact">
            {CONTACT.shortAddress}
            <br />
            {CONTACT.phones.map((p) => (
              <span key={p.number}>
                <a href={telHref(p.number)}>{p.number}</a>
                <br />
              </span>
            ))}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </div>

        <div>
          <div className="pk-footer__head">Find us</div>
          <div className="pk-footer__list">
            {[...LISTINGS, ...SOCIAL].map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pk-shell">
        <div className="pk-footer__base">
          <span>
            © {new Date().getFullYear()} Panwar Knitwear. All prices in INR, inclusive of
            GST unless stated.
          </span>
          <span>Knitted in Ludhiana, Punjab</span>
        </div>
      </div>
    </footer>
  )
}
