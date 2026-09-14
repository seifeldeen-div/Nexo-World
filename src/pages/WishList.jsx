import { useContext, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FaHeart } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { Link } from "react-router-dom"
import { wishContext } from "../components/context/WishlistContext"
import ProductCard from "../components/Products/components/ProductCard"
import PageTransition from "../components/PageTransition"
import './Style/WishList.css'

function WishList() {

    const { wishlistContext, deleteWishItem } = useContext(wishContext)
    const [removingIds, setRemovingIds] = useState([])

    const hearts = Array.isArray(wishlistContext) ? wishlistContext : []

    const handleRemove = (id) => {
        if (removingIds.includes(id)) return
        setRemovingIds((prev) => [...prev, id])

        window.setTimeout(() => {
            deleteWishItem(id)
            setRemovingIds((prev) => prev.filter((itemId) => itemId !== id))
        }, 420)
    }

    const floatHearts = [
        { left: '8%', size: 22, delay: 0, dur: 9 },
        { left: '18%', size: 34, delay: 1.4, dur: 11 },
        { left: '32%', size: 18, delay: 0.8, dur: 8 },
        { left: '46%', size: 28, delay: 2.2, dur: 12 },
        { left: '58%', size: 16, delay: 0.3, dur: 7 },
        { left: '70%', size: 38, delay: 1.8, dur: 10 },
        { left: '82%', size: 22, delay: 2.8, dur: 9 },
        { left: '92%', size: 30, delay: 1.1, dur: 11 },
        { left: '26%', size: 12, delay: 3.2, dur: 8 },
        { left: '64%', size: 14, delay: 2.5, dur: 9 },
    ]

    return (
        <PageTransition>
            <section className="wishlistPage">
                <div className="wishBgHearts" aria-hidden="true">
                    {floatHearts.map((h, i) => (
                        <FaHeart
                            key={i}
                            style={{
                                left: h.left,
                                fontSize: h.size,
                                animationDelay: `${h.delay}s`,
                                animationDuration: `${h.dur}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="container">
                    <motion.header
                        className="wishlistIntro"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="wishMeta">
                            <span className="wishTag"><FaHeart /> Wishlist</span>
                            <span className="wishCount">{hearts.length} saved {hearts.length === 1 ? 'item' : 'items'}</span>
                        </div>
                        <h1>Your <em>Wishlist</em></h1>
                        <p>
                            Everything you've loved, kept safe. Tap the heart card to move a treasure back to shopping.
                        </p>
                    </motion.header>

                    {hearts.length === 0 ? (
                        <motion.div
                            className="emptyWish"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="emptyPulse">
                                <FaHeart />
                            </div>
                            <h3>Your wishlist is empty</h3>
                            <p>Fill it with the things your future-self will thank you for.</p>
                            <Link to="/allProducts" className="emptyBtn">Discover Products</Link>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="wishlistGridWrap"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                        >
                            <div className="wishlistGrid">
                                <AnimatePresence>
                                    {hearts.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 34, scale: 0.92 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.84, y: 12, filter: 'blur(4px)' }}
                                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                            className={`wishCard ${removingIds.includes(item.id) ? 'removing' : ''}`}
                                        >
                                            <button
                                                type="button"
                                                className="removeWish"
                                                onClick={() => handleRemove(item.id)}
                                                aria-label="Remove from wishlist"
                                            >
                                                <MdDelete />
                                            </button>
                                            <ProductCard item={item} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>
        </PageTransition>
    )
}

export default WishList