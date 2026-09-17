import { createContext, useEffect, useState } from "react"


export const CartContext = createContext()

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))

        if (!currentUser?.email) return []

        const savedItems = localStorage.getItem("CartItems")
        const allUsersCart = savedItems
            ? JSON.parse(savedItems)
            : {}
        return allUsersCart[currentUser.email] || []
    })

    useEffect(() => {
        const reloadUserCart = () => {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"))

            if (!currentUser?.email) {
                setCartItems([])
                return
            }

            const savedItems = localStorage.getItem("CartItems")
            const allUsersCart = savedItems
                ? JSON.parse(savedItems)
                : {}
            setCartItems(allUsersCart[currentUser.email] || [])
        }

        window.addEventListener("nexoUserChange", reloadUserCart)
        return () => window.removeEventListener("nexoUserChange", reloadUserCart)
    }, [])

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
        const currentUser = JSON.parse(
            localStorage.getItem("currentUser")
        )

        if (!currentUser?.email) return

        const savedItems = localStorage.getItem("CartItems")
        const allUsersCart = savedItems
            ? JSON.parse(savedItems)
            : {}
        allUsersCart[currentUser.email] = cartItems

        localStorage.setItem(
            "CartItems",
            JSON.stringify(allUsersCart)
        )
    }, [cartItems])

    return (
        <CartContext.Provider value={{ cartItems, addToCart, increaseItemCart, decreaseItemCart, deleteCrtItem }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
