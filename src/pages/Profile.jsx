import PageTransition from "../components/PageTransition"
import {
    FaUserAlt,
    FaShoppingBag,
    FaHeart,
    FaMapMarkerAlt,
    FaCreditCard,
    FaCog,
    FaHeadset,
    FaSignOutAlt,
    FaBoxOpen,
    FaRegStar,
    FaTruck,
    FaCheckCircle,
    FaEdit,
    FaRegCopy,
    FaChevronRight
} from "react-icons/fa"
import './Style/Profile.css'
import { useContext, useState } from "react"
import { wishContext } from "../components/context/WishlistContext"
import { CartContext } from "../components/context/CartContext"
import ProfileOverview from "../components/ProfileOverview"
import { Link } from "react-router-dom"
import WishList from "./WishList"
import Orders from "../components/Orders"

const userData = JSON.parse(localStorage.getItem("registerData"))
const keys = Object.keys(userData)
const Data = {
    'username': userData[keys[0]],
    'email': userData[keys[1]],
}

function Profile() {
    const [activeSection, setActiveSection] = useState()
    const { wishlistContext } = useContext(wishContext)
    const { cartItems } = useContext(CartContext)

    const handleActiveSection = (e, activeSec) => {
        e.preventDefault()
        setActiveSection(activeSec)
    }




    return (
        <PageTransition>
            <section className="profilePage">
                <div className="profileGlow" aria-hidden="true" />

                <div className="container">
                    <div className="profileHeader">
                        <div className="profileUser">
                            <div className="profileAvatar">A</div>
                            <div className="profileUserInfo">
                                <h1>{Data.username} <em>welcome back</em></h1>
                                <p>{Data.email} <span>·</span> Member </p>
                            </div>
                        </div>

                        <div className="profileHeaderActions">
                            <button type="button" className="profileOutlineBtn">
                                <FaEdit /> Edit profile
                            </button>
                            <button type="button" className="profileSolidBtn">
                                <FaShoppingBag /> New order
                            </button>
                        </div>
                    </div>

                    <div className="profileStats">
                        <div className="profileStatCard">
                            <span className="profileStatIcon blue"><FaBoxOpen /></span>
                            <div>
                                <strong> {cartItems.length} </strong>
                                <p>Total orders</p>
                            </div>
                        </div>
                        <div className="profileStatCard">
                            <span className="profileStatIcon pink"><FaHeart /></span>
                            <div>
                                <strong> {wishlistContext.length} </strong>
                                <p>Wishlist items</p>
                            </div>
                        </div>
                        <div className="profileStatCard">
                            <span className="profileStatIcon amber"><FaRegStar /></span>
                            <div>
                                <strong>0.0</strong>
                                <p>Loyalty points</p>
                            </div>
                        </div>
                        <div className="profileStatCard">
                            <span className="profileStatIcon green"><FaTruck /></span>
                            <div>
                                <strong>0</strong>
                                <p>Delivered</p>
                            </div>
                        </div>
                    </div>

                    <div className="profileLayout">
                        <aside className="profileSidebar">
                            <nav className="profileNav">
                                <p className="profileNavTitle">Account</p>
                                <a onClick={(e) => {
                                    handleActiveSection(e, 'overview')
                                }} to="/overview" className="profileNavLink active">
                                    <span className="profileNavIcon"><FaUserAlt /></span>
                                    Overview
                                </a>
                                <a onClick={(e) => {
                                    handleActiveSection(e, 'orders')
                                }} href="#orders" className="profileNavLink">
                                    <span className="profileNavIcon"><FaShoppingBag /></span>
                                    My Orders
                                    <em className="profileNavCount">24</em>
                                </a>
                                <a onClick={(e) => {
                                    handleActiveSection(e, 'wishlist')
                                }} href="#wishlist" className="profileNavLink">
                                    <span className="profileNavIcon"><FaHeart /></span>
                                    Wishlist
                                    <em className="profileNavCount">18</em>
                                </a>
                                <a onClick={(e) => {
                                    handleActiveSection(e, 'addresses')
                                }} href="#addresses" className="profileNavLink">
                                    <span className="profileNavIcon"><FaMapMarkerAlt /></span>
                                    Addresses
                                </a>
                                <a onClick={(e) => {
                                    handleActiveSection(e, 'payment')
                                }} href="#payment" className="profileNavLink">
                                    <span className="profileNavIcon"><FaCreditCard /></span>
                                    Payment methods
                                </a>

                                <p className="profileNavTitle">Settings</p>
                                <a onClick={() => {
                                    handleActiveSection(e, 'settings')
                                }} href="#settings" className="profileNavLink">
                                    <span className="profileNavIcon"><FaCog /></span>
                                    Account settings
                                </a>
                                <a href="#support" className="profileNavLink">
                                    <span className="profileNavIcon"><FaHeadset /></span>
                                    Support
                                </a>
                                <a href="#logout" className="profileNavLink logout">
                                    <span className="profileNavIcon"><FaSignOutAlt /></span>
                                    Log out
                                </a>
                            </nav>
                        </aside>
                        {/* ------------------------------------------------------------------------------------------------- */}
                        <div className="profileContent">
                            {activeSection === "overview" && <ProfileOverview />}
                            {activeSection === "orders" && <Orders />}
                            {activeSection === "wishlist" && <WishList />}
                            {activeSection === "addresses" && <Addresses />}
                            {activeSection === "payment" && <PaymentMethods />}
                            {activeSection === "settings" && <AccountSettings />}
                        </div>
                    </div>
                </div>
            </section>
        </PageTransition>
    )
}

export default Profile