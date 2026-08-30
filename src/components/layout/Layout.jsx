import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useScrollTop } from '../../hooks/useScrollTop'

export default function Layout() {
  const { pathname } = useLocation()
  useScrollTop()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      {/* Keying on pathname replays the page-in fade for every route. */}
      <main key={pathname} className="pk-page" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
