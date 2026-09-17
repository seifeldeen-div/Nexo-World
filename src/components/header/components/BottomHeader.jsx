import { FaTh, FaHome, FaInfoCircle, FaHeadset, FaBlog, FaEnvelope, FaUser, FaChevronDown, FaUserPlus } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const handleLogOut = (navigate) => {
    Swal.fire({
        title: "Log out of your account?",
        text: "You'll be signed out securely. Your session will end immediately.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0090f0",
        cancelButtonColor: "#7b7b7b",
        confirmButtonText: "Yes, log out",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
            popup: "logout-popup",
            title: "logout-title",
            htmlContainer: "logout-text",
            confirmButton: "logout-confirm-btn",
            cancelButton: "logout-cancel-btn"
        }
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("loginBtnStatue", 'false')
            localStorage.removeItem("currentUser")
            window.dispatchEvent(new Event("nexoUserChange"))
            Swal.fire({
                title: "Logged out",
                text: "You have been logged out successfully.",
                icon: "success",
                confirmButtonColor: "#0090f0",
                timer: 2500,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                customClass: {
                    popup: "logout-popup",
                    title: "logout-title",
                    htmlContainer: "logout-text"
                }
            }).then(() => {
                    navigate('/login')
            })
        }
    })
}

const navLinks = [
    { title: 'Home', href: '/', icon: <FaHome /> },
    { title: 'About', href: '/about', icon: <FaInfoCircle /> },
    { title: 'Accessories', href: '/accessories', icon: <FaHeadset /> },
    { title: 'Blog', href: '/blog', icon: <FaBlog /> },
    { title: 'Contact', href: '/contact', icon: <FaEnvelope /> }
]

function ButtonHeader({ collapsed, onExpand }) {
    const [categories, setCategories] = useState([])
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const navigate = useNavigate()
    
    const linkLocation = useLocation()

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, [])

    useEffect(() => {
        setIsCategoryOpen(false)
    }, [linkLocation.pathname])

    useEffect(() => {
        if (collapsed) {
            setIsCategoryOpen(false)
        }
    }, [collapsed])

    const handleCategoryClick = () => {
        if (collapsed) {
            onExpand?.()
            setIsCategoryOpen(true)
        } else {
            setIsCategoryOpen(prev => !prev)
        }
    }

    const isLoggedIn = localStorage.getItem("loginBtnStatue") === 'true'

    return (
        <div className="sidebarBody">
            <nav className="categoryNav" aria-label="Categories">
                <button
                    type="button"
                    className={`categoryBtn ${isCategoryOpen ? 'open' : ''}`}
                    data-label="Categories"
                    aria-expanded={isCategoryOpen}
                    onClick={handleCategoryClick}
                >
                    <span className="iconWrap"><FaTh /></span>
                    <span className="label">Categories</span>
                    <span className="chevron"><FaChevronDown /></span>
                </button>
                <div className={`categoryList ${isCategoryOpen ? 'show' : ''}`}>
                    <div className="categoryListInner">
                        {
                            categories.map((category) => {
                                return (
                                    <Link key={category.slug} to={`/category/${category.slug}`}>
                                        {category.name}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </nav>

            <div className="sidebarDivider" role="separator" />

            <ul className="sideLinks">
                {
                    navLinks.map((link) => {
                        return (
                            <li key={link.title} className={linkLocation.pathname === link.href ? 'active' : ''}>
                                <Link to={link.href} data-label={link.title}>
                                    <span className="iconWrap">{link.icon}</span>
                                    <span className="label">{link.title}</span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>

            <div className="sidebarBottom">
                {isLoggedIn ? (
                    <Link to="/profile" className="sidebarUser" data-label="Profile">
                        <span className="iconWrap"><FaUser /></span>
                        <span className="label">Profile</span>
                    </Link>
                ) : (
                    <Link to="/register" className="sidebarUser" data-label="Sign up">
                        <span className="iconWrap"><FaUserPlus /></span>
                        <span className="label">Sign up</span>
                    </Link>
                )}

                {isLoggedIn && (
                    <button type="button" className="sidebarLogout" data-label="Log out" onClick={() => {
                        handleLogOut(navigate)
                    }}>
                        <span className="iconWrap"><PiSignOutBold /></span>
                        <span className="label">Log out</span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default ButtonHeader