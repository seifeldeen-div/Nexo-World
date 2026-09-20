import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { FaHeart, FaShoppingBag, FaChevronRight, FaCartArrowDown, FaTrashAlt } from "react-icons/fa"
import { wishContext } from "./context/WishlistContext"
import { CartContext } from "./context/CartContext"
import PageTransition from "./PageTransition"
import toast from "react-hot-toast"

const WISH_TOAST_STYLE = {
    maxWidth: "min(420px, calc(100vw - 32px))",
    padding: "12px 14px",
    background: "linear-gradient(135deg, #ff2d55, #ff5d7e)",
    color: "#fff",
    border: "none",
    borderRadius: "16px",
    boxShadow: "0 16px 40px rgba(255, 45, 85, 0.35)",
}

const HEART_BURST = [
    { dx: -34, dy: -100, r: -32, d: 0 },
    { dx: 34, dy: -100, r: 32, d: 0.05 },
    { dx: 0, dy: -122, r: 0, d: 0.02 },
    { dx: -56, dy: -66, r: -46, d: 0.1 },
    { dx: 56, dy: -66, r: 46, d: 0.1 },
    { dx: -18, dy: -112, r: -16, d: 0.07 },
    { dx: 18, dy: -112, r: 16, d: 0.07 },
]

function ProfileWishList() {
    const { wishlistContext, deleteWishItem } = useContext(wishContext)
    const { cartItems, addToCart } = useContext(CartContext)
    const [removingIds, setRemovingIds] = useState([])
    const [burstHearts, setBurstHearts] = useState([])

    const hearts = Array.isArray(wishlistContext) ? wishlistContext : []

    const handleRemove = (id) => {
        if (removingIds.includes(id)) return
        setRemovingIds((prev) => [...prev, id])
        setBurstHearts((prev) => [...prev, id])

        window.setTimeout(() => {
            deleteWishItem(id)
            setRemovingIds((prev) => prev.filter((itemId) => itemId !== id))
        }, 460)

        window.setTimeout(() => {
            setBurstHearts((prev) => prev.filter((itemId) => itemId !== id))
        }, 1500)

        toast.success(
            <div className="wish-toast-wrapper">
                <div className="image">
                    <FaHeart />
                </div>
                <div className="content">
                    <strong>Removed from wishlist</strong>
                    <p>You can always save it again later.</p>
                </div>
            </div>,
            { duration: 2500, style: WISH_TOAST_STYLE }
        )
    }

    const handleAddToCart = (item) => {
        addToCart(item)
        if (!cartItems.some((c) => c.id === item.id)) {
            deleteWishItem(item.id)
        }

        toast.success(
            <div className="wish-toast-wrapper">
                <div className="image">
                    <FaShoppingBag />
                </div>
                <div className="content">
                    <strong>{item.title}</strong>
                    <p>{cartItems.some((c) => c.id === item.id) ? "Already in your cart" : "Moved to your cart"}</p>
                </div>
                <div className="btn">
                    <Link to='/cart'>View Cart</Link>
                </div>
            </div>,
            { duration: 3000, style: WISH_TOAST_STYLE }
        )
    }

    const handleMoveAll = () => {
        if (!hearts.length) return

        const itemsToMove = hearts.filter((item) => !cartItems.some((c) => c.id === item.id))
        const movedCount = itemsToMove.length
        const alreadyCount = hearts.length - movedCount

        itemsToMove.forEach((item) => {
            addToCart(item)
            deleteWishItem(item.id)
        })

        toast.success(
            <div className="wish-toast-wrapper">
                <div className="image">
                    <FaShoppingBag />
                </div>
                <div className="content">
                    <strong>{movedCount} {movedCount === 1 ? "item" : "items"} moved to cart</strong>
                    <p>{alreadyCount > 0 ? `${alreadyCount} already in your cart` : "Added to your cart"}</p>
                </div>
                <div className="btn">
                    <Link to='/cart'>View Cart</Link>
                </div>
            </div>
            , {
                duration: 3000,
                style: {
                    ...WISH_TOAST_STYLE,
                    background: "linear-gradient(135deg, #0090f0, #38a9f5)",
                    boxShadow: "0 16px 40px rgba(0, 144, 240, 0.35)",
                },
            }
        )
    }

    return (
        <PageTransition>
            <div id="wishlist" className="profileCard profileWishCard">
                <div className="profileCardHead">
                    <div>
                        <span className="profileCardLabel">Saved for later</span>
                        <h2>My <em>wishlist</em> <span className="profileWishCount">{hearts.length}</span></h2>
                    </div>
                    <div className="profileWishActions">
                        <button
                            onClick={handleMoveAll}
                            type="button"
                            className="profileLinkBtn"
                            disabled={!hearts.length}
                        >
                            <FaShoppingBag /> Move all to cart
                        </button>
                        <Link to="/wishlist" className="profileLinkBtn">View all <FaChevronRight /></Link>
                    </div>
                </div>

                {hearts.length === 0 ? (
                    <motion.div
                        className="profileWishEmpty"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="profileWishEmptyIcon">
                            <FaHeart />
                        </div>
                        <h3>Your wishlist is empty</h3>
                        <p>Save the products you love and they will be waiting for you here.</p>
                        <Link to="/allProducts" className="profileWishBtn">
                            <FaShoppingBag /> Discover products
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        className="profileOrders profileWishOrders"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <AnimatePresence mode="popLayout">
                            {hearts.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 24, scale: 0.94 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.82, y: 12, filter: 'blur(4px)' }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className={`profileOrderItem profileWishRow ${removingIds.includes(item.id) ? 'removing' : ''}`}
                                >
                                    <div className="profileOrderIcon profileWishIcon">
                                        <img src={item.images[0]} alt={item.title} />
                                        <span className="profileWishHeartBadge">
                                            <FaHeart />
                                        </span>
                                    </div>

                                    <div className="profileOrderMain">
                                        <Link to={`/products/${item.id}`} className="profileWishTitleLink">
                                            <strong>{item.title.replace("-", " ")}</strong>
                                        </Link>
                                        <p>{`${item.description.slice(0,30)}.......`}</p>
                                    </div>

                                    <div className="profileOrderStatus">
                                        <span className="profileWishStatusTag"><FaHeart /> Saved</span>
                                    </div>

                                    <div className="profileOrderTotal profileWishTotal">
                                        <span>Price</span>
                                        <strong>$ {item.price}</strong>
                                    </div>

                                    <div className="profileWishRowActions">
                                        <button
                                            type="button"
                                            className="profileWishCartBtn"
                                            onClick={() => handleAddToCart(item)}
                                            aria-label="Move to cart"
                                        >
                                            <FaCartArrowDown />
                                        </button>
                                        <button
                                            type="button"
                                            className="profileWishRemoveBtn"
                                            onClick={() => handleRemove(item.id)}
                                            aria-label="Remove from wishlist"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>

                                    {burstHearts.includes(item.id) && (
                                        <div className="profileWishHeartBurst" aria-hidden="true">
                                            {HEART_BURST.map((h, index) => (
                                                <FaHeart
                                                    key={index}
                                                    style={{
                                                        '--h-i': index,
                                                        '--dx': `${h.dx}px`,
                                                        '--dy': `${h.dy}px`,
                                                        '--r': `${h.r}deg`,
                                                        '--d': `${h.d}s`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </PageTransition>
    )
}

export default ProfileWishList