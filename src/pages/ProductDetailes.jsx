import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BsCartCheck } from "react-icons/bs";

import './Style/ProductDetailes.css'
import { TiStarFullOutline } from "react-icons/ti"
import { FaHeart, FaShare } from "react-icons/fa";
import Products from "../components/Products/Products";
import SlideProductLoading from "../components/Products/components/SlideProductLoading";
import HeroProductDetaillesLoading from "../components/Products/components/HeroProductDetaillesLoading";
import { CartContext } from "../components/context/CartContext";
import toast from "react-hot-toast";

function ProductDetailes() {

    const { productID } = useParams()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [productsCategory, setProductsCategoty] = useState([])
    const { cartItems, addToCart } = useContext(CartContext)
    const isInCart = product ? cartItems.some((item) => item.id === product.id) : false

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
                                <div className="icons">
                                    <FaHeart />
                                    <FaShare />
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
