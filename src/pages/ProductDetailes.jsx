import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { BsCartCheck } from "react-icons/bs";

import './Style/ProductDetailes.css'
import { TiStarFullOutline } from "react-icons/ti"
import { FaHeart, FaShare } from "react-icons/fa";
import Products from "../components/Products/Products";
import SlideProductLoading from "../components/Products/components/SlideProductLoading";
import HeroProductDetaillesLoading from "../components/Products/components/HeroProductDetaillesLoading";
import { CartContext } from "../components/context/CartContext";
import toast from "react-hot-toast";
import { wishContext } from "../components/context/WishlistContext";

const HEART_BURST = [
    { dx: -30, dy: -84, r: -26, d: 0 },
    { dx: 30, dy: -84, r: 26, d: 0.05 },
    { dx: 0, dy: -104, r: 0, d: 0.02 },
    { dx: -48, dy: -54, r: -38, d: 0.1 },
    { dx: 48, dy: -54, r: 38, d: 0.1 },
    { dx: -16, dy: -96, r: -14, d: 0.07 },
    { dx: 16, dy: -96, r: 14, d: 0.07 },
]

function ProductDetailes() {

    const { productID } = useParams()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [heartBurst, setHeartBurst] = useState(null)
    const [productsCategory, setProductsCategoty] = useState([])
    const { cartItems, addToCart } = useContext(CartContext)
    const { wishlistContext, addToWish } = useContext(wishContext)
    const navigate = useNavigate()
    const isInCart = product ? cartItems.some((item) => item.id === product.id) : false
    const isInWishlist = product ? wishlistContext.some((item) => item.id === product.id) : false

    const requireLogin = () => {
        let currentUser = null
        try {
            currentUser = JSON.parse(localStorage.getItem("currentUser"))
        } catch {
            currentUser = null
        }

        if (!currentUser?.email) {
            toast.error("Must Login First")
            navigate('/login')
            return false
        }
        return true
    }

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${productID}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .then(() => setIsLoading(false))
    }, [productID])
    console.log(product)

    useEffect(() => {
        if (!product?.category) return

        fetch(`https://dummyjson.com/products/category/${product.category}`)
            .then(res => res.json())
            .then(data => setProductsCategoty(data.products))
    }, [product?.category])

    const handleAddWish = () => {
        if (isInWishlist || !product) return
        if (!requireLogin()) return

        addToWish(product)
        setHeartBurst(HEART_BURST)
        window.setTimeout(() => setHeartBurst(null), 1400)

        toast.success(
            <div className="wish-toast-wrapper">
                <div className="image">
                    <FaHeart />
                </div>
                <div className="content">
                    <strong>{product.title}</strong>
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
            {isLoading ? (
                <HeroProductDetaillesLoading />
            ) : (
                <div className="productDetailes">
                    <div className="container">
                        <div className="imageItem">
                            <div className="bigImage">
                                <img id="heroImage" src={product.images[0]} alt={product.title} />
                            </div>
                            <div className="smallImage">
                                {product.images.map((item, index) => {
                                    return (
                                        <img onClick={() => {
                                            let heroImage = document.querySelector("#heroImage")
                                            heroImage.src = item
                                        }} key={index} src={item} alt={product.title} />
                                    )
                                })}
                            </div>
                        </div>
                        <div className="detailesItem">
                            <h1 className="name"> {product.title}</h1>
                            <div className="rates">
                                <TiStarFullOutline />
                                <TiStarFullOutline />
                                <TiStarFullOutline />
                                <TiStarFullOutline />
                                <TiStarFullOutline />
                            </div>
                            <div className="price">
                                <p className="price">$ {product.price}</p>
                            </div>
                            <div className="textContent">
                                <h5>Availability : <span>{product.availabilityStatus}</span></h5>
                                <h5>Brand : <span>{product.brand}</span></h5>
                                <h5 className="stock">Hurry Up! Only <span>{product.stock}</span> Products Left In Stock : </h5>
                            </div>
                            <div className="description">
                                <p>{product.description}</p>
                            </div>
                            <div className="shopBtn">
                                <button
                                    className={`btn product-cart-button ${isInCart ? "is-added" : ""}`}
                                    type="button"
                                    onClick={() => {
                                        if (isInCart) {
                                            toast("Already added to cart", { icon: "✓" })
                                            return
                                        }
                                        if (!requireLogin()) return
                                        addToCart(product)
                                        toast.success(
                                            <div className="toast-wrapper">
                                                <div className="image">
                                                    <img src={product.images[0]} alt={product.title} />
                                                </div>
                                                <div className="content">
                                                    <strong>{product.title}</strong>
                                                    <p>Added To Cart</p>
                                                </div>
                                                <div className="btn">
                                                    <Link to='/cart'>View Cart</Link>
                                                </div>
                                            </div>
                                            , { duration: 3000 }
                                        )
                                    }}
                                >
                                    <span
                                        key={isInCart ? "added" : "add"}
                                        className="button-label"
                                    >
                                        {isInCart ? "Added" : "Add to cart"}
                                    </span>
                                    <BsCartCheck />
                                </button>
                                <div className="icons detailIcons">
                                    <span
                                        onClick={handleAddWish}
                                        className={isInWishlist ? "wish-active" : ""}
                                        aria-disabled={isInWishlist}
                                        aria-label={isInWishlist ? "In wishlist" : "Add to wishlist"}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <FaHeart />
                                        {heartBurst && (
                                            <div className="heartBurst detailHeartBurst" aria-hidden="true">
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
                                    </span>
                                    <Link onClick={(e) => {
                                        e.preventDefault()
                                        toast(
                                            "Under Developing",
                                            {
                                                duration: 1500,
                                            },
                                        );
                                    }} to={'/'}>
                                        <FaShare />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isLoading ? (
                <SlideProductLoading />
            ) : (
                <div className="suggestions">
                    <div className="container">
                        <Products key={product.category} title={product.category.replace("-", " ")} data={productsCategory} />
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductDetailes
