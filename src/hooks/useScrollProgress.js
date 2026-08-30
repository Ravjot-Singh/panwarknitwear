import { useEffect, useState } from 'react'

/**
 * Reports whether the page has left the top, and how far down it is (0–1).
 *
 * Scroll events are already coalesced to one per frame by the browser, and
 * reading `scrollY` costs nothing, so this measures inline rather than hopping
 * through requestAnimationFrame — which some embedded/background contexts
 * throttle to a standstill, leaving the header stuck in its initial state.
 * The expensive read (`scrollHeight`, which forces layout) is cached and
 * refreshed only on resize.
 */
export function useScrollProgress(threshold = 8) {
  const [state, setState] = useState({ scrolled: false, progress: 0 })

  useEffect(() => {
    let max = 1

    const remeasure = () => {
      max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      )
    }

    const update = () => {
      const y = window.scrollY || window.pageYOffset || 0
      const scrolled = y > threshold
      const progress = Math.min(1, Math.max(0, y / max))
      setState((prev) =>
        prev.scrolled === scrolled && Math.abs(prev.progress - progress) < 0.003
          ? prev
          : { scrolled, progress }
      )
    }

    const onResize = () => {
      remeasure()
      update()
    }

    remeasure()
    update()

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', onResize)
    }
  }, [threshold])

  return state
}
