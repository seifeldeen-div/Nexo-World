import ProductDetailes from "./pages/ProductDetailes"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import Header from "./components/header/Header"
import AllProductsPage from "./pages/AllProductsPage"
import Cart from "./pages/Cart"
import { Toaster } from "react-hot-toast"
import ScrollToTop from "./components/ScrollToTop"
import { AnimatePresence } from "framer-motion"
import CategoryProducts from "./pages/CategoryProducts"
import Search from "./pages/Search"
import WishList from "./pages/WishList"
import About from "./pages/About"
import Accessories from "./pages/Accessories"
import Blog from "./pages/Blog"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Toaster
        position="bottom-right"
        gutter={12}
        toastOptions={{
          duration: 3200,
          className: "app-toast",
          style: {
            maxWidth: "min(420px, calc(100vw - 32px))",
            padding: "10px",
            border: "1px solid rgba(37, 50, 55, 0.08)",
            borderRadius: "14px",
            background: "#ffffff",
            color: "#0080ff",
            boxShadow: "0 16px 40px rgba(37, 50, 55, 0.16)",
          },
          success: {
            iconTheme: {
              primary: "#0090f0",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#e05252",
              secondary: "#ffffff",
            },
          },
        }}
      />
      <AnimatePresence mode='wait'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productID" element={<ProductDetailes />} />
          <Route path="/allProducts" element={<AllProductsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:categoryName" element={<CategoryProducts />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/about" element={<About />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
