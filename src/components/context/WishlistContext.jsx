import { createContext, useEffect, useState } from "react"

export const wishContext = createContext()

const WISH_STORAGE_KEY = "wishItems"

const getCurrentEmail = () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        return currentUser?.email || null
    } catch {
        return null
    }
}

const readAllUsersWish = () => {
    try {
        const saved = localStorage.getItem(WISH_STORAGE_KEY)
        return saved ? JSON.parse(saved) : {}
    } catch {
        return {}
    }
}

const saveWishForUser = (email, items) => {
    if (!email) return
    const allUsersWish = readAllUsersWish()
    allUsersWish[email] = items
    localStorage.setItem(WISH_STORAGE_KEY, JSON.stringify(allUsersWish))
}

export default function WishlistProvider({ children }) {

    const [wishlistContext, setwishlistContext] = useState(() => {
        const email = getCurrentEmail()
        if (!email) return []
        return readAllUsersWish()[email] || []
    })

    useEffect(() => {
        const reloadUserWishlist = () => {
            const email = getCurrentEmail()
            if (!email) {
                setwishlistContext([])
                return
            }
            setwishlistContext(readAllUsersWish()[email] || [])
        }

        window.addEventListener("nexoUserChange", reloadUserWishlist)
        return () => window.removeEventListener("nexoUserChange", reloadUserWishlist)
    }, [])

    const addToWish = (newItem) => {
        setwishlistContext((prevItems) => {
            if (prevItems.some((item) => item.id === newItem.id)) return prevItems
            const nextItems = [...prevItems, newItem]
            saveWishForUser(getCurrentEmail(), nextItems)
            return nextItems
        })
    }

    const deleteWishItem = (id) => {
        setwishlistContext((prevItems) => {
            const nextItems = prevItems.filter((item) => item.id !== id)
            saveWishForUser(getCurrentEmail(), nextItems)
            return nextItems
        })
    }

    return (
        <wishContext.Provider value={{ wishlistContext, addToWish, deleteWishItem }}>
            {children}
        </wishContext.Provider>
    )
}