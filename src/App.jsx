import ProductDetailes from "./pages/ProductDetailes"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import Header from "./components/header/Header"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productID" element={<ProductDetailes />} />
      </Routes>
    </>
  )
}

export default App
