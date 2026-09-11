import { Link } from "react-router-dom"
import Logo from '../../../assets/img/logo.png'
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import SearchBox from "../../SearchBox";

function TopHeader() {


    const { cartItems } = useContext(CartContext)

    return (
        <div className="topHeader">
            <div className="container">
                <div className="headerLogoContainer">
                    <Link className="headerLogo" to={'./'}><img src={Logo} alt="Logo" /></Link>
                </div>
                <SearchBox />
                <div className="headerIcons">
                    <div className="icon wishList">
                        <FaRegHeart />
                        <span className="count">0</span>
                    </div>
                    <div className="icon cart">
                        <Link to="/cart">
                        <LuShoppingCart />
                        <span className="count">{cartItems.length}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopHeader
