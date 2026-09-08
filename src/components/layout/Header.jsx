import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import ModeToggle from './ModeToggle'
import './header.css'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/collection', label: 'Collection' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/feedback', label: 'Feedback' },
]

export default function Header() {
  const { count } = useCart()
  const { count: saved } = useWishlist()
  const { pathname } = useLocation()
  const { scrolled, progress } = useScrollProgress()
  const [open, setOpen] = useState(false)
  const [bump, setBump] = useState(false)
  const prevCount = useRef(count)

  /* Close the drawer whenever the route changes. */
  useEffect(() => setOpen(false), [pathname])

  /* Pulse the badge once when the count actually moves. */
  useEffect(() => {
    if (count !== prevCount.current) {
      prevCount.current = count
      if (count > 0) {
        setBump(true)
        const t = setTimeout(() => setBump(false), 360)
        return () => clearTimeout(t)
      }
    }
  }, [count])

  /* Lock the page behind the open drawer. */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={['pk-header', scrolled ? 'is-stuck' : '', open ? 'is-open' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="pk-header__inner pk-shell">
        <Link to="/" className="pk-brand">
          <span className="pk-brand__name" data-text="Panwar Knitwear">
            Panwar Knitwear
          </span>
          <span className="pk-brand__sub">Ludhiana · Knitting &amp; Finishing</span>
        </Link>

        <nav
          aria-label="Main"
          className={['pk-nav', open ? 'is-open' : ''].filter(Boolean).join(' ')}
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                ['pk-nav__link', 'pk-underline', isActive ? 'is-current' : '']
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Sits with the cart rather than among the page links: it changes
              what every price on the site means, so it belongs next to the bag
              it feeds. */}
          <ModeToggle />

          {/* Only shown once something is saved: an always-visible zero is
              noise in a header this compact. */}
          {saved > 0 ? (
            <Link
              to="/wishlist"
              className="pk-nav__saved"
              aria-label={`Saved styles, ${saved} ${saved === 1 ? 'style' : 'styles'}`}
            >
              <span aria-hidden="true">★</span>
              <span className="pk-num">{saved}</span>
            </Link>
          ) : null}

          <Link
            to="/cart"
            className="pk-nav__cart"
            aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <span>Cart</span>
            <span
              aria-hidden="true"
              className={['pk-nav__count', 'pk-num', bump ? 'pk-bump' : ''].filter(Boolean).join(' ')}
            >
              {count}
            </span>
          </Link>
        </nav>

        <button
          type="button"
          className={['pk-burger', open ? 'is-open' : ''].filter(Boolean).join(' ')}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Reading progress — a rust rule drawn along the bottom of the header. */}
      <span
        className="pk-header__progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${progress})` }}
      />

      {open ? <div className="pk-scrim" onClick={() => setOpen(false)} aria-hidden="true" /> : null}
    </header>
  )
}
