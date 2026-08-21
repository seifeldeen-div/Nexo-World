import { TiStarFullOutline } from "react-icons/ti";
import { FaShare, FaHeart, FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";


function ProductCard(props) {
    console.log(props.item)
    return (
        <>
            <div className="product">
                <div className="imgProduct">
                    <img src={props.item.images[0]} alt="" />
                </div>
                <div className="content">
                    <h3>{props.item.title}</h3>
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
                <div className="icons">
                    <a><Link to={'./'}><FaCartArrowDown /></Link></a>
                    <a><Link to={'./'}><FaHeart /></Link></a>
                    <a><Link to={'./'}><FaShare /></Link></a>
                </div>
                <button className="btn">Buy Now</button>
            </div>
        </>
    )
}

export default ProductCard
