import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/* Client-side route changes are silent to a screen reader: the URL and the DOM
   change, but nothing is announced the way a full page load would be. This
   reads out the new page's title after each navigation.

   The title is read from document.title rather than a route table, so it picks
   up whatever <Seo> set — including the product name on /product/:id. It is
   read in a microtask-deferred effect so it runs after the page's own <Seo>
   effect has written the title. */
export default function RouteAnnouncer() {
  const { pathname } = useLocation()
  const [message, setMessage] = useState('')

  useEffect(() => {
    const id = setTimeout(() => {
      setMessage(document.title ? `${document.title}. Page loaded.` : '')
    }, 100)
    return () => clearTimeout(id)
  }, [pathname])

  return (
    <div className="pk-sr-only" role="status" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  )
}
