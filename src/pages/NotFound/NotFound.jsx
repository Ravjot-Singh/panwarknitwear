import { Link } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import Seo from '../../components/seo/Seo'
import { ROUTE_SEO } from '../../data/seo'
import './not-found.css'

/* Replaces the silent redirect to "/" that used to answer every unmatched
   route. That redirect returned HTTP 200 with homepage content for any dead
   URL, which Google classes as a soft 404: the bogus URL keeps getting
   crawled, may be indexed as a duplicate of the homepage, and Search Console
   fills with errors that dilute the real pages.

   A static SPA cannot emit a true 404 status — the Vercel rewrite is
   unconditional — but a page that plainly says "not found" and carries
   noindex is the accepted fix, and it also lets the visitor see what
   happened. */
export default function NotFound() {
  return (
    <div className="pk-shell pk-404">
      <Seo {...ROUTE_SEO['/404']} />

      <Reveal as="div" className="pk-eyebrow">
        404
      </Reveal>
      <Reveal as="h1" className="pk-404__head" delay={60}>
        This page came off the frame.
      </Reveal>
      <Reveal as="p" className="pk-404__body" delay={120}>
        The address you asked for isn't on the floor — it may have moved, or the link
        may have been mistyped. The collection and the contact desk are both a step
        away.
      </Reveal>

      <Reveal className="pk-row pk-404__actions" delay={180}>
        <Link to="/collection" className="pk-btn">
          Browse the collection
        </Link>
        <Link to="/contact" className="pk-btn pk-btn--ghost">
          Contact us
        </Link>
      </Reveal>

      <Reveal className="pk-404__links" delay={240}>
        <Link to="/" className="pk-quiet">
          Home
        </Link>
        <Link to="/about" className="pk-quiet">
          About the unit
        </Link>
        <Link to="/feedback" className="pk-quiet">
          Feedback
        </Link>
      </Reveal>
    </div>
  )
}
