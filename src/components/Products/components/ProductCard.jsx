import { TiStarFullOutline } from "react-icons/ti";
import { FaShare, FaHeart, FaCartArrowDown, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import '../Products.css'
import toast from "react-hot-toast";
import { wishContext } from "../../context/WishlistContext";

// https://dummyjson.com/products/1

const HEART_BURST = [
    { dx: -30, dy: -84, r: -26, d: 0 },
    { dx: 30, dy: -84, r: 26, d: 0.05 },
    { dx: 0, dy: -104, r: 0, d: 0.02 },
    { dx: -48, dy: -54, r: -38, d: 0.1 },
    { dx: 48, dy: -54, r: 38, d: 0.1 },
    { dx: -16, dy: -96, r: -14, d: 0.07 },
    { dx: 16, dy: -96, r: 14, d: 0.07 },
]

function ProductCard(props) {
    const { cartItems, addToCart } = useContext(CartContext)
    const { wishlistContext, addToWish } = useContext(wishContext)
    const [heartBurst, setHeartBurst] = useState(null)

    const isInCart = cartItems.some((i => i.id === props.item.id))
    const isInWishlist = wishlistContext.some((i => i.id === props.item.id))

    const handleAddWish = (event) => {
        event.preventDefault()
        if (isInWishlist) return

        addToWish(props.item)
        setHeartBurst(HEART_BURST)
        window.setTimeout(() => setHeartBurst(null), 1400)

        toast.success(
            <div className="wish-toast-wrapper">
                <div className="image">
                    <FaHeart />
                </div>
                <div className="content">
                    <strong>{props.item.title}</strong>
                    <p>Saved to wishlist</p>
                </div>
                <div className="btn">
                    <Link to='/wishlist'>View Wishlist</Link>
                </div>
            </div>
            , {
                duration: 3000,
                style: {
                    maxWidth: "min(420px, calc(100vw - 32px))",
                    padding: "12px 14px",
                    background: "linear-gradient(135deg, #ff2d55, #ff5d7e)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "16px",
                    boxShadow: "0 16px 40px rgba(255, 45, 85, 0.35)",
                },
            }
        )
    }

    return (
        <>
            <div className={`product ${isInCart ? 'inCart' : ''} ${isInWishlist ? 'inWish' : ''}`}>
                <span className="statueCard">
                    <FaCheckCircle />
                    <span>In Cart</span>
                </span>
                {isInWishlist && (
                    <span className="wishBadge">
                        <FaHeart />
                        <span>Wishlist</span>
                    </span>
                )}
                {heartBurst && (
                    <div className="heartBurst" aria-hidden="true">
                        {heartBurst.map((h, index) => (
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
                <Link to={`/products/${props.item.id}`}>
                    <div className="imgProduct">
                        <img src={props.item.images[0]} alt={props.item.titel} />
                    </div>
                    <div className="content">
                        <h3>{props.item.title.replace("-", " ")}</h3>
                    </div>
                    <div className="rate">
                        <TiStarFullOutline />
                        <TiStarFullOutline />
                        <TiStarFullOutline />
                        <TiStarFullOutline />
                        <TiStarFullOutline />
                    </div>
                    <div className="price">
                        <p><span>$ {props.item.price}</span></p>
                    </div>
                </Link>
                <div className="icons">
                    <Link onClick={(event) => {
                        event.preventDefault()
                        addToCart(props.item)
                        toast.success(
                            <div className="toast-wrapper">
                                <div className="image">
                                    <img src={props.item.images[0]} alt={props.item.title} />
                                </div>
                                <div className="content">
                                    <strong>{props.item.title}</strong>
                                    <p>Added To Cart</p>
                                </div>
                                <div className="btn">
                                    <Link to='/cart'>View Cart</Link>
                                </div>
                            </div>
                            , { duration: 3000 }
                        )
                    }} to={'./'} aria-label="Add to cart"><FaCartArrowDown /></Link>
                    <Link
                        onClick={handleAddWish}
                        className={isInWishlist ? 'wish-active' : ''}
                        aria-disabled={isInWishlist}
                        aria-label={isInWishlist ? "In wishlist" : "Add to wishlist"}
                        to={'./'}>
                        <FaHeart />
                    </Link>
                    <Link to={'./'} aria-label="Share product"><FaShare /></Link>
                </div>
                <button className="btn">Buy Now</button>
            </div>
        </>
    )
}

export default ProductCard