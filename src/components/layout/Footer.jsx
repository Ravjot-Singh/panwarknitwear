import { Link } from 'react-router-dom'
import { CONTACT, LISTINGS, SOCIAL, LABEL_SITES, telHref } from '../../data/site'
import './footer.css'

/* Every link here leaves the site, so each one says so in its accessible name
   — the visual treatment gives no such cue. */
function ExternalLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${label} (opens in a new tab)`}
    >
      {label}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="pk-footer">
      <div className="pk-footer__grid pk-shell">
        <div>
          <h2 className="pk-footer__brand">Panwar Knitwear</h2>
          <p className="pk-footer__blurb">
            Knitting, processing and finishing under one roof in Ludhiana since 1996.
            Home of ZONIXA and MSP SPORTS.
          </p>
        </div>

        <nav aria-labelledby="pk-foot-pages">
          <h2 className="pk-footer__head" id="pk-foot-pages">
            Pages
          </h2>
          <ul className="pk-footer__list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/collection">Collection</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
            <li>
              <Link to="/wishlist">Saved styles</Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="pk-foot-labels">
          <h2 className="pk-footer__head" id="pk-foot-labels">
            Labels
          </h2>
          <ul className="pk-footer__list">
            <li>
              <Link to="/collection?label=ZONIXA">ZONIXA</Link>
            </li>
            <li>
              <Link to="/collection?label=MSP%20SPORTS">MSP SPORTS</Link>
            </li>
            <li>
              <Link to="/collection?mode=wholesale">Wholesale</Link>
            </li>
            {LABEL_SITES.map((s) => (
              <li key={s.href}>
                <ExternalLink href={s.href} label={s.label} />
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="pk-footer__head">Reach us</h2>
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

        <nav aria-labelledby="pk-foot-find">
          <h2 className="pk-footer__head" id="pk-foot-find">
            Find us
          </h2>
          <ul className="pk-footer__list">
            {[...LISTINGS, ...SOCIAL].map((l) => (
              <li key={l.href}>
                <ExternalLink href={l.href} label={l.label} />
              </li>
            ))}
          </ul>
        </nav>
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
