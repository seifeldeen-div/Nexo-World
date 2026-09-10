import { createContext, useEffect, useState } from "react"


export const CartContext = createContext()

function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState(() => {
        const savedItems = localStorage.getItem("CartItems")
        return savedItems ? JSON.parse(savedItems) : []
    })

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }])
    }

    const increaseItemCart = (id) => {
        setCartItems((prevItems) => prevItems.map((item) => (
            item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        )))
    }

    const decreaseItemCart = (id) => {
        setCartItems((prevItems) => prevItems.map((item) => (
            item.id === id
                ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
                : item
        )))
    }

    const deleteCrtItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    }

    useEffect(() => {
        localStorage.setItem("CartItems", JSON.stringify(cartItems))
    }, [cartItems])

    return (
        <CartContext.Provider value={{ cartItems, addToCart, increaseItemCart, decreaseItemCart, deleteCrtItem }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
