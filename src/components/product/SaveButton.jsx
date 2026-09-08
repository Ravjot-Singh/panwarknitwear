import { useWishlist } from '../../context/WishlistContext'
import './save-button.css'

/* Wishlist toggle.
 *
 * The accessible name says which way the button will go ("Save" / "Saved"),
 * and aria-pressed carries the state, so it is never only the filled glyph
 * that distinguishes the two. */
export default function SaveButton({ product, className = '' }) {
  const { has, toggle } = useWishlist()
  const saved = has(product.id)

  return (
    <button
      type="button"
      className={['pk-save', saved ? 'is-saved' : '', className].filter(Boolean).join(' ')}
      aria-pressed={saved}
      aria-label={saved ? `Saved — remove ${product.name}` : `Save ${product.name}`}
      title={saved ? 'Remove from saved' : 'Save for later'}
      onClick={() => toggle(product.id)}
    >
      <span className="pk-save__mark" aria-hidden="true">
        {saved ? '★' : '☆'}
      </span>
    </button>
  )
}
