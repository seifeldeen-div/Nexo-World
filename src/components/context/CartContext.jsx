import { createContext, useEffect, useState } from "react"

export const CartContext = createContext()

function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState(() => {
        const savedItems = localStorage.getItem("CartItems")
        return savedItems ? JSON.parse(savedItems) : []
    })

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item])
    }

    useEffect(() => {
        localStorage.setItem("CartItems", JSON.stringify(cartItems))
    },[cartItems])

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
