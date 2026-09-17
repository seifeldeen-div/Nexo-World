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
import { Link, useNavigate } from "react-router-dom"
import WishList from "./WishList"
import Orders from "../components/Orders"
import ProfileEdit from "../components/ProfileEdit"
import { handleLogOut } from "../components/header/components/BottomHeader"
import ProfileWishList from "../components/ProfileWishList"
import toast from "react-hot-toast"

export const Data = {
    'username': '',
    'password': '',
    'email': '',
    'phone': '',
    'zip': '',
    'country': '',
    'city': '',
}

function Profile() {
    const currentUserEmail = JSON.parse(localStorage.getItem("currentUser"))?.email || ''
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {}
    const userData = usersData[currentUserEmail] || {}

    Data.username = userData.username || ''
    Data.password = userData.password || ''
    Data.email = userData.email || ''
    Data.phone = userData.phone || ''
    Data.zip = userData.zip || ''
    Data.country = userData.country || ''
    Data.city = userData.city || ''

    const [activeSection, setActiveSection] = useState('overview')
    const { wishlistContext } = useContext(wishContext)
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const handleActiveSection = (e, activeSec) => {
        e.preventDefault()
        setActiveSection(activeSec)
    }

    if (localStorage.getItem("loginBtnStatue") == 'false')
        return navigate("/")

    return (
        <PageTransition>
            <section className="profilePage">
                <div className="profileGlow" aria-hidden="true" />
                <div className="container">
                    <div className="profileHeader">
                        <div className="profileUser">
                            <div className="profileAvatar"> {Data.username[0] || 'undefiend'} </div>
                            <div className="profileUserInfo">
                                <h1>{Data.username || 'undefiend'} <em>welcome back</em></h1>
                                <p>{Data.email || 'undefiend'} <span>·</span> Member </p>
                            </div>
                        </div>

                        <div className="profileHeaderActions">
                            <button onClick={() => {
                                setActiveSection('edit')
                            }} type="button" className="profileOutlineBtn">
                                <FaEdit /> Edit profile
                            </button>
                            <button onClick={() => {
                                navigate("/allproducts")
                            }} type="button" className="profileSolidBtn">
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
                                <strong>0</strong>
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
                                }} to="/overview" className={`profileNavLink ${activeSection == 'overview' ? 'active' : ''}`} >
                                    <span className="profileNavIcon"><FaUserAlt /></span>
                                    Overview
                                </a>
                                <a onClick={(e) => {
                                    handleActiveSection(e, 'edit')
                                }} href="#edit" className={`profileNavLink ${activeSection == 'edit' ? 'active' : ''}`}>
                                    <span className="profileNavIcon"><FaEdit /></span>
                                    Edit profile
                                </a>
                                <a onClick={(e) => {
                                    handleActiveSection(e, 'orders')
                                }} href="#orders" className={`profileNavLink ${activeSection == 'orders' ? 'active' : ''}`}>
                                    <span className="profileNavIcon"><FaShoppingBag /></span>
                                    My Orders
                                    <em className="profileNavCount">{cartItems.length}</em>
                                </a>
                                <a onClick={(e) => {
                                    handleActiveSection(e, 'wishlist')
                                }} href="#wishlist" className={`profileNavLink ${activeSection == 'wishlist' ? 'active' : ''}`}>
                                    <span className="profileNavIcon"><FaHeart /></span>
                                    Wishlist
                                    <em className="profileNavCount"> {wishlistContext.length} </em>
                                </a>

                                <p className="profileNavTitle">Settings</p>
                                <a onClick={() => {
                                    handleActiveSection(e, 'settings')
                                }} href="#settings" className="profileNavLink">
                                    <span className="profileNavIcon"><FaCog /></span>
                                    Account settings
                                </a>
                                <a onClick={(e) => {
                                    e.preventDefault()
                                    if (localStorage.getItem("loginBtnStatue") == 'true')
                                        handleLogOut()
                                    else {
                                        toast.error("Login First")
                                    }
                                }} href="#logout" className="profileNavLink logout">
                                    <span className="profileNavIcon"><FaSignOutAlt /></span>
                                    Log out
                                </a>
                            </nav>
                        </aside>
                        {/* ------------------------------------------------------------------------------------------------- */}
                        <div className="profileContent">
                            {/* <ProfileOverview /> */}
                            {activeSection === "overview" && <ProfileOverview />}
                            {activeSection === "edit" && <ProfileEdit />}
                            {activeSection === "orders" && <Orders />}
                            {activeSection === "wishlist" && <ProfileWishList />}
                            {activeSection === "addresses" && <Addresses />}
                            {activeSection === "settings" && <AccountSettings />}
                        </div>
                    </div>
                </div>
            </section>
        </PageTransition>
    )
}

export default Profile