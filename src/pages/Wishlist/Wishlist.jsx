import { Link } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import ProductCard from '../../components/product/ProductCard'
import Seo from '../../components/seo/Seo'
import { ROUTE_SEO } from '../../data/seo'
import { useWishlist } from '../../context/WishlistContext'
import './wishlist.css'

export default function Wishlist() {
  const { products, count, clear } = useWishlist()

  return (
    <div className="pk-shell pk-wish">
      <Seo {...ROUTE_SEO['/wishlist']} />

      <Reveal as="div" className="pk-eyebrow">
        Saved
      </Reveal>
      <Reveal as="h1" className="pk-h1" style={{ maxWidth: '24ch' }} delay={60}>
        {count ? 'The styles you set aside.' : 'Nothing set aside yet.'}
      </Reveal>

      {count ? (
        <>
          <Reveal className="pk-wish__bar" delay={110}>
            <p>
              {count} {count === 1 ? 'style' : 'styles'} saved on this device
            </p>
            <button type="button" className="pk-quiet" onClick={clear}>
              Clear all
            </button>
          </Reveal>

          <div className="pk-pgrid" key={count}>
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 60} headingLevel={2} />
            ))}
          </div>
        </>
      ) : (
        <Reveal delay={110}>
          <p className="pk-lede" style={{ marginBottom: 30 }}>
            Tap the star on any style to keep it here while you decide. Saved styles stay
            in this browser — they are not tied to an account.
          </p>
          <Link to="/collection" className="pk-btn">
            Browse the collection
          </Link>
        </Reveal>
      )}
    </div>
  )
}
