import { Link } from "react-router-dom"
import Logo from '../../../assets/img/logo.png'
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import SearchBox from "../../SearchBox";
import { wishContext } from "../../context/WishlistContext";

function TopHeader() {


    const { cartItems } = useContext(CartContext)
    const {wishlistContext} = useContext(wishContext)

    return (
        <div className="topHeader">
            <div className="container">
                <div className="headerLogoContainer">
                    <Link className="headerLogo" to={'./'}><img src={Logo} alt="Logo" /></Link>
                </div>
                <SearchBox />
                <div className="headerIcons">
                    <div className="icon wishList">
                        <Link to='/wishlist'>
                            <FaRegHeart />
                            <span className="count">{wishlistContext.length}</span>
                        </Link>
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
