import { MdArrowDropDown } from "react-icons/md";
import { FaArrowTurnDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { PiSignInBold } from "react-icons/pi";
import { AiOutlineMenu } from "react-icons/ai";


function ButtonHeader() {

    const [categories, setCategories] = useState([])
    const navLinks = [{
        title: 'Home',
        href: '/'
    }, {
        title: 'About',
        href: '/about'
    }, {
        title: 'Accessories',
        href: '/accessories'
    }, {
        title: 'Blog',
        href: '/blog'
    }, {
        title: 'Contact',
        href: '/contact'
    }]
    const linkLocation = useLocation()
    const [iscategoryNavListOpen, setIscategoryNavListOpen] = useState(false)

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, [])

    console.log(categories)

    return (
        <div className="bottomHeader">
            <div className="container">
                <div className="nav">
                    <div className="categoryNav">
                        <div className="categoryBtn" onClick={() => {
                            setIscategoryNavListOpen(!iscategoryNavListOpen)
                        }}>
                            <AiOutlineMenu />
                            <p>Categories</p>
                            <MdArrowDropDown className="categoryBtn-svg2" />
                        </div>
                        <div className={`categoryNavList ${iscategoryNavListOpen ? 'activeCategoryNavList' : ''}`}>
                            {
                                categories.map((category) => {
                                    return <Link key={category.slug} to={category.slug}>{category.name}</Link>
                                })
                            }
                        </div>
                    </div>
                    <ul className="navLinks">
                        {
                            navLinks.map((link) => {
                                return <li key={link.title} className={linkLocation.pathname === link.href ? 'activeLink' : ''}><Link to={link.href}>{link.title}</Link></li>
                            })
                        }
                    </ul>
                </div>
                <div className="navLinkIcons">
                    <div className="icon">
                        <PiSignInBold />
                    </div>
                    <div className="icon">
                        <FaUserPlus />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ButtonHeader
