import { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react'
import { PRODUCTS, getProduct, INR } from '../data/products'
import { DEFAULT_SHIPPING, getShipping } from '../data/shipping'

const STORAGE_KEY = 'pk-cart'
const MODE_KEY = 'pk-mode'

const CartContext = createContext(null)

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* private mode / storage disabled — the cart just won't persist */
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(() => read(STORAGE_KEY, []))
  const [mode, setMode] = useState(() => read(MODE_KEY, 'retail'))
  /* Not persisted: a delivery choice belongs to the order being placed, not to
     the browser. It resets with each checkout, unlike the cart and the mode. */
  const [shipping, setShipping] = useState(DEFAULT_SHIPPING)

  useEffect(() => write(STORAGE_KEY, lines), [lines])
  useEffect(() => write(MODE_KEY, mode), [mode])

  const priceOf = useCallback(
    (product) => (mode === 'retail' ? product.retail : product.whole),
    [mode]
  )

  const add = useCallback((product, size, qty) => {
    const key = product.id + '|' + size
    setLines((prev) => {
      const found = prev.find((l) => l.key === key)
      if (found) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
      }
      return [...prev, { key, id: product.id, size, qty }]
    })
  }, [])

  const setQty = useCallback((key, delta) => {
    setLines((prev) =>
      prev
        .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    )
  }, [])

  const remove = useCallback((key) => {
    setLines((prev) => prev.filter((l) => l.key !== key))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const count = useMemo(() => lines.reduce((a, l) => a + l.qty, 0), [lines])

  /* Hydrated lines — each carries its product record and formatted labels. */
  const detailed = useMemo(
    () =>
      lines
        .map((l) => {
          const product = getProduct(l.id)
          if (!product) return null
          const unit = priceOf(product)
          return {
            ...l,
            product,
            unit,
            meta: `Size ${l.size} · ${INR(unit)} each · ${product.spec}`,
            short: `${product.name} × ${l.qty}`,
            total: INR(unit * l.qty),
          }
        })
        .filter(Boolean),
    [lines, priceOf]
  )

  const totals = useMemo(() => {
    const wholesale = mode === 'wholesale'
    const sub = lines.reduce((a, l) => {
      const p = getProduct(l.id)
      return p ? a + priceOf(p) * l.qty : a
    }, 0)
    const tax = wholesale ? sub * 0.05 : 0

    /* The selected method's cost actually lands in the total now. An empty bag
       has no delivery line at all. */
    const method = getShipping(shipping)
    const shipCost = sub > 0 ? method.cost : 0

    return {
      subtotal: INR(sub),
      taxLabel: wholesale ? 'GST at 5%' : 'GST (included)',
      tax: wholesale ? INR(tax) : '—',
      ship: sub > 0 ? method.label : '—',
      shipMethod: method,
      total: INR(sub + tax + shipCost),
      note: wholesale
        ? 'Wholesale rates are ex-GST against MOQ. A proforma follows within one working day; 30% advance opens the knitting slot.'
        : 'Standard surface delivery is free across India. Returns accepted within 7 days, unworn and with tags.',
    }
  }, [lines, mode, priceOf, shipping])

  const value = useMemo(
    () => ({
      lines: detailed,
      raw: lines,
      count,
      mode,
      setMode,
      isWholesale: mode === 'wholesale',
      shipping,
      setShipping,
      priceOf,
      add,
      setQty,
      remove,
      clear,
      totals,
      catalogue: PRODUCTS,
    }),
    [
      detailed,
      lines,
      count,
      mode,
      shipping,
      priceOf,
      add,
      setQty,
      remove,
      clear,
      totals,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
