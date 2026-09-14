import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
    FaArrowRight,
    FaBluetoothB,
    FaCamera,
    FaGamepad,
    FaHeadphones,
    FaHeadset,
    FaMobileAlt,
    FaShieldAlt,
    FaTruck,
    FaUndo,
} from "react-icons/fa"
import heroImage from "../assets/img/banner_Hero1.jpg"
import heroImage2 from "../assets/img/banner_Hero2.jpg"
import heroImage3 from "../assets/img/banner_Hero3.jpg"
import bannerImage from "../assets/img/bannar2_Products_Page.png"
import accImage1 from "../assets/img/img-1.jpg"
import PageTransition from "../components/PageTransition"
import './Style/Accessories.css'

const categories = [
    { name: "Headphones", desc: "Premium sound, total focus", icon: FaHeadphones },
    { name: "Phone Accessories", desc: "Cases, chargers & more", icon: FaMobileAlt },
    { name: "Camera Equipment", desc: "Capture life in detail", icon: FaCamera },
    { name: "Wireless Tech", desc: "Cables out, freedom in", icon: FaBluetoothB },
    { name: "Gaming Gear", desc: "Play at your best", icon: FaGamepad },
]

const featured = [
    {
        name: "Aurora Wireless Headphones",
        price: 129,
        old: 159,
        tag: "Best Seller",
        img: heroImage2,
    },
    {
        name: "Pulse Smart Watch",
        price: 199,
        old: 249,
        tag: "New",
        img: heroImage3,
    },
    {
        name: "Echo Mini Speaker",
        price: 59,
        old: 79,
        tag: "Sale",
        img: heroImage,
    },
]

const features = [
    { icon: FaTruck, title: "Fast Delivery", desc: "Free shipping on orders over $50" },
    { icon: FaUndo, title: "Easy Returns", desc: "30-day hassle-free returns" },
    { icon: FaHeadset, title: "24/7 Support", desc: "Real people, around the clock" },
    { icon: FaShieldAlt, title: "Secure Payment", desc: "Your payments are always protected" },
]

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease },
})

function Accessories() {
    return (
        <PageTransition>
            <section className="accessoriesPage">
                <div className="accGlow" aria-hidden="true" />

                <div className="container">
                    <div className="accHero">
                        <div className="accHeroContent">
                            <motion.span
                                className="accHeroBadge"
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease }}
                            >
                                Accessories Collection
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.65, delay: 0.08, ease }}
                            >
                                Elevate Your <em>Everyday Tech</em>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.65, delay: 0.16, ease }}
                            >
                                From studio-grade audio to smart wearables — discover the extras that make
                                your favorite devices feel brand new again.
                            </motion.p>
                            <motion.div
                                className="accHeroActions"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.65, delay: 0.24, ease }}
                            >
                                <Link to="/allProducts" className="accCta accCtaFill">
                                    Shop All Products <FaArrowRight />
                                </Link>
                                <Link to="/contact" className="accCta accCtaGhost">
                                    Contact Us
                                </Link>
                            </motion.div>
                        </div>
                        <motion.div
                            className="accHeroVisual"
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.12, ease }}
                        >
                            <div className="accHeroImg">
                                <img src={heroImage} alt="Nexo audio accessory" />
                            </div>
                            <div className="accHeroCard">
                                <span>2,400+</span>
                                <p>Hand-picked accessories</p>
                            </div>
                        </motion.div>
                    </div>

                    <div id="accCategories" className="accSection">
                        <div className="secHead">
                            <motion.span className="secSub" {...fadeUp()}>What we offer</motion.span>
                            <motion.h2 {...fadeUp(0.05)}>Shop by Category</motion.h2>
                            <motion.p {...fadeUp(0.1)}>
                                Browse our curated accessory lineup, built for your favorite devices.
                            </motion.p>
                        </div>
                        <div className="accCatGrid">
                            {categories.map((cat, index) => {
                                const Icon = cat.icon
                                return (
                                    <motion.div
                                        className="accCatTile"
                                        key={cat.name}
                                        {...fadeUp(index * 0.06)}
                                    >
                                        <span className="accCatIcon">
                                            <Icon />
                                        </span>
                                        <h3>{cat.name}</h3>
                                        <p>{cat.desc}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="accSection">
                        <div className="secHead">
                            <motion.span className="secSub" {...fadeUp()}>Trending now</motion.span>
                            <motion.h2 {...fadeUp(0.05)}>Featured Accessories</motion.h2>
                            <motion.p {...fadeUp(0.1)}>
                                The picks our customers love — quality you can feel, prices you'll like.
                            </motion.p>
                        </div>
                        <div className="accGrid">
                            {featured.map((item, index) => (
                                <motion.div
                                    className="accItem"
                                    key={item.name}
                                    {...fadeUp(index * 0.08)}
                                >
                                    <div className="accItemImg">
                                        <span className="accItemTag">{item.tag}</span>
                                        <img src={item.img} alt={item.name} />
                                    </div>
                                    <div className="accItemBody">
                                        <h3>{item.name}</h3>
                                        <div className="accItemPrice">
                                            <strong>${item.price}</strong>
                                            {item.old && <del>${item.old}</del>}
                                        </div>
                                        <Link to="/allProducts" className="accItemBtn">
                                            View Deal <FaArrowRight />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div className="accPromo" {...fadeUp(0.05)}>
                        <div className="accPromoImg">
                            <img src={bannerImage} alt="Nexo accessories promo" />
                        </div>
                        <div className="accPromoContent">
                            <span className="secSub">Limited offer</span>
                            <h2>Up to <em>40% Off</em> on Accessory Kits</h2>
                            <p>
                                Build the perfect bundle — headphones, chargers and smart gear,
                                all in one cart.
                            </p>
                            <Link to="/allProducts" className="accCta accCtaFill">
                                Grab the Deal <FaArrowRight />
                            </Link>
                        </div>
                    </motion.div>

                    <div className="accFeatures">
                        {features.map((feat, index) => {
                            const Icon = feat.icon
                            return (
                                <motion.div
                                    className="accFeature"
                                    key={feat.title}
                                    {...fadeUp(index * 0.07)}
                                >
                                    <span className="accFeatureIcon">
                                        <Icon />
                                    </span>
                                    <h4>{feat.title}</h4>
                                    <p>{feat.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </PageTransition>
    )
}

export default Accessories