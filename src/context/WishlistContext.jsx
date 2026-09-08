import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { getProduct } from '../data/products'

/* Saved styles, kept in localStorage exactly as the cart is. Product ids only
   — no size, no quantity: a wishlist is "come back to this style", and asking
   for a size at save time is the decision the shopper is trying to defer. */

const STORAGE_KEY = 'pk-wishlist'

const WishlistContext = createContext(null)

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(read)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      /* private mode / storage disabled — it just won't persist */
    }
  }, [ids])

  const has = useCallback((id) => ids.includes(id), [ids])

  const toggle = useCallback((id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const remove = useCallback((id) => {
    setIds((prev) => prev.filter((x) => x !== id))
  }, [])

  const clear = useCallback(() => setIds([]), [])

  /* A style dropped from the catalogue should not wedge the wishlist page. */
  const products = useMemo(() => ids.map(getProduct).filter(Boolean), [ids])

  const value = useMemo(
    () => ({ ids, products, count: products.length, has, toggle, remove, clear }),
    [ids, products, has, toggle, remove, clear]
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return ctx
}
