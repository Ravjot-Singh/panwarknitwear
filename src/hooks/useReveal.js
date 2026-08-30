import { useEffect, useRef, useState } from 'react'

/**
 * Adds `is-in` once the element crosses into view. One-shot: we stop
 * observing after the first hit so panels never re-animate on scroll-back.
 */
export function useReveal({ threshold = 0.18, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || shown) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    io.observe(node)
    return () => io.disconnect()
  }, [threshold, rootMargin, shown])

  return [ref, shown]
}
