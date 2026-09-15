import { MdArrowDropDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { PiSignOutBold } from "react-icons/pi";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import Swal from 'sweetalert2'

function ButtonHeader() {
    const [categories, setCategories] = useState([])
    const navLinks = [
        { title: 'Home', href: '/' },
        { title: 'About', href: '/about' },
        { title: 'Accessories', href: '/accessories' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' }
    ]

    const linkLocation = useLocation()
    const [iscategoryNavListOpen, setIscategoryNavListOpen] = useState(false)
    const [isNavOpen, setIsNavOpen] = useState(false)

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, [])

    useEffect(() => {
        setIscategoryNavListOpen(false)
        setIsNavOpen(false)
    }, [linkLocation.pathname])

    const closeCategoryNav = () => {
        setIscategoryNavListOpen(false)
        setIsNavOpen(false)
    }

    return (
        <div className="bottomHeader">
            <div className="container">
                <button
                    className="mobileNavToggle"
                    type="button"
                    aria-expanded={isNavOpen}
                    aria-label="Toggle navigation menu"
                    onClick={() => {
                        setIscategoryNavListOpen(false)
                        setIsNavOpen(!isNavOpen)
                    }}
                >
                    <AiOutlineMenu />
                </button>
                <div className="nav">
                    <div className="categoryNav">
                        <div className="categoryBtn" onClick={() => {
                            setIsNavOpen(false)
                            setIscategoryNavListOpen(!iscategoryNavListOpen)
                        }}>
                            <AiOutlineMenu className="categoryBtn-svg1" />
                            <p>Categories</p>
                            <MdArrowDropDown className="categoryBtn-svg2" />
                        </div>
                        <div className={`categoryNavList ${iscategoryNavListOpen ? 'activeCategoryNavList' : ''}`}>
                            {
                                categories.map((category) => {
                                    return (
                                        <Link
                                            key={category.slug}
                                            to={`/category/${category.slug}`}
                                            onClick={closeCategoryNav}
                                        >
                                            {category.name}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <ul className={`navLinks ${isNavOpen ? 'activeNavLinks' : ''}`}>
                        {
                            navLinks.map((link) => {
                                return <li key={link.title} className={linkLocation.pathname === link.href ? 'activeLink' : ''}><Link to={link.href}>{link.title}</Link></li>
                            })
                        }
                    </ul>
                </div>
                <div className={`navLinkIcons ${isNavOpen ? 'activeNavLinkIcons' : ''}`}>
                    <div onClick={() => {
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
                                    window.location.reload()
                                })
                            }
                        });
                    }} className={`icon ${localStorage.getItem("loginBtnStatue") == 'false' ? 'hideLogOutBtn' : ''} `}>
                        <PiSignOutBold />
                    </div>
                    {localStorage.getItem("loginBtnStatue") == 'false' ? (
                        <Link to="/register" className="icon">
                            <FaUserPlus />
                        </Link>
                    ) : (
                        <Link to="/profile" className={`icon`}>
                            <FaUser />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ButtonHeader
