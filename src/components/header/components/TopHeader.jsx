import { Link } from "react-router-dom"
import Logo from '../../../assets/img/logo.png'
import { FaSearch } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function TopHeader() {


    const { cartItems } = useContext(CartContext)

    return (
        <div className="topHeader">
            <div className="container">
                <div className="headerLogoContainer">
                    <Link className="headerLogo" to={'./'}><img src={Logo} alt="Logo" /></Link>
                </div>
                <form action="" className="searchBox">
                    <input type="text" name="search" id="search" placeholder="Search For Products" />
                    <button type="submit" ><FaSearch /></button>
                </form>
                <div className="headerIcons">
                    <div className="icon wishList">
                        <CiHeart />
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
