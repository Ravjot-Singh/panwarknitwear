import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import RouteAnnouncer from '../a11y/RouteAnnouncer'
import { useScrollTop } from '../../hooks/useScrollTop'

export default function Layout() {
  const { pathname } = useLocation()
  useScrollTop()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a href="#main" className="pk-skip">
        Skip to content
      </a>
      <Header />
      {/* Keying on pathname replays the page-in fade for every route. */}
      <main key={pathname} id="main" tabIndex={-1} className="pk-page" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <RouteAnnouncer />
    </div>
  )
}
