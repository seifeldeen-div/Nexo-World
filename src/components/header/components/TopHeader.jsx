import { Link } from "react-router-dom"
import Logo from '../../../assets/img/logo.png'
import LogoMark from '../../../assets/img/icon.png'
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import SearchBox from "../../SearchBox";
import { wishContext } from "../../context/WishlistContext";

function TopHeader({ collapsed, onExpand }) {

    const { cartItems } = useContext(CartContext)
    const { wishlistContext } = useContext(wishContext)

    return (
        <div className="sidebarTop">
            <Link className="sidebarLogo" to="/" aria-label="Nexo home">
                <img className="primary" src={Logo} alt="Nexo logo" />
                <img className="mark" src={LogoMark} alt="Nexo" />
            </Link>

            {collapsed ? (
                <button
                    className="sidebarSearchBtn"
                    type="button"
                    title="Search"
                    aria-label="Search"
                    onClick={onExpand}
                >
                    <FaSearch />
                </button>
            ) : (
                <div className="sidebarSearch">
                    <SearchBox />
                </div>
            )}

            <div className="sidebarIcons">
                <Link className="sidebarIcon" to="/wishlist" title="Wishlist" data-label="Wishlist">
                    <span className="iconWrap"><FaRegHeart /></span>
                    <span className="label">Wishlist</span>
                    <span className="count">{wishlistContext.length}</span>
                </Link>
                <Link className="sidebarIcon" to="/cart" title="Cart" data-label="Cart">
                    <span className="iconWrap"><LuShoppingCart /></span>
                    <span className="label">Cart</span>
                    <span className="count">{cartItems.length}</span>
                </Link>
            </div>
        </div>
    )
}

export default TopHeader