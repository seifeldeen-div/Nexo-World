import ProductDetailes from "./pages/ProductDetailes"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import Header from "./components/header/Header"
import AllProductsPage from "./pages/AllProductsPage"
import Cart from "./pages/Cart"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productID" element={<ProductDetailes />} />
        <Route path="/allProducts" element={<AllProductsPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
