import { Link } from "react-router-dom"
import Logo from '../../../assets/img/logo.png'
import { FaSearch } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";

function TopHeader() {
    return (
        <header className="topHeader">
            <div className="container">
                <div className="headerLogoContainer">
                    <Link className="headerLogo" to={'./'}><img src={Logo} alt="Logo" /></Link>
                </div>
                <form action="" className="searchBox">
                    <input type="text" name="search" id="search" placeholder="Search For Products" />
                    <button type="submit" ><FaSearch /></button>
                </form>
                <div className="heagerIcons">
                    <div className="icon wishList">
                        <CiHeart />
                        <span className="count">0</span>
                    </div>
                    <div className="icon cart">
                        <LuShoppingCart />
                        <span className="count">1</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default TopHeader
