import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Every route change starts at the top, the way the design's go() did. */
export function useScrollTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    } catch {
      window.scrollTo(0, 0)
    }
  }, [pathname, search])

  return null
}
