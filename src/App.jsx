import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import Collection from './pages/Collection/Collection'
import Product from './pages/Product/Product'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import OrderPlaced from './pages/OrderPlaced/OrderPlaced'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Feedback from './pages/Feedback/Feedback'
import Wishlist from './pages/Wishlist/Wishlist'
import NotFound from './pages/NotFound/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-placed" element={<OrderPlaced />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="wishlist" element={<Wishlist />} />
        {/* A real page, not a redirect home: see NotFound for why that was a
            soft 404. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
