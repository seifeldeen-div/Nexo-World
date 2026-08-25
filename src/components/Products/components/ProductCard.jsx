import { TiStarFullOutline } from "react-icons/ti";
import { FaShare, FaHeart, FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

// https://dummyjson.com/products/1

function ProductCard(props) {
    console.log(props.item)
    return (
        <>
            <div className="product">
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
                    <Link to={'./'} aria-label="Add to cart"><FaCartArrowDown /></Link>
                    <Link to={'./'} aria-label="Add to wishlist"><FaHeart /></Link>
                    <Link to={'./'} aria-label="Share product"><FaShare /></Link>
                </div>
                <button className="btn">Buy Now</button>
            </div>
        </>
    )
}

export default ProductCard
