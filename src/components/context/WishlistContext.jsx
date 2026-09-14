import { createContext, useEffect, useState } from "react"

export const wishContext = createContext()

export default function WishlistProvider({ children }) {

    const [wishlistContext, setwishlistContext] = useState(() => {
        const savedItems = localStorage.getItem("wishItems")
        return savedItems ? JSON.parse(savedItems) : []
    })

    const addToWish = (newItem) => {
        setwishlistContext((prevItems) => {
            if (prevItems.some((item) => item.id === newItem.id)) return prevItems
            return [...prevItems, newItem]
        })
    }

    const deleteWishItem = (id) => {
        setwishlistContext((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    useEffect(() => {
        localStorage.setItem("wishItems", JSON.stringify(wishlistContext))
    }, [wishlistContext])

    return (
        <wishContext.Provider value={{ wishlistContext, addToWish, deleteWishItem }}>
            {children}
        </wishContext.Provider>
    )
}
