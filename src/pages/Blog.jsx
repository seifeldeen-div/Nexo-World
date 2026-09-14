import { useState } from "react"
import { motion } from "framer-motion"
import { FaArrowRight, FaCalendarAlt, FaClock, FaCommentDots } from "react-icons/fa"
import heroImage1 from "../assets/img/banner_Hero1.jpg"
import heroImage2 from "../assets/img/banner_Hero2.jpg"
import heroImage3 from "../assets/img/banner_Hero3.jpg"
import bannerImage1 from "../assets/img/bannar1_Products_Page.png"
import bannerImage2 from "../assets/img/bannar2_Products_Page.png"
import bannerImage3 from "../assets/img/bannar3_Products_Page.png"
import bannerImage4 from "../assets/img/bannar4_Products_Page.png"
import PageTransition from "../components/PageTransition"
import toast from "react-hot-toast"
import './Style/Blog.css'

const cats = ["All", "Guides", "News", "Reviews", "Offers"]

const posts = [
    {
        id: 1,
        title: "The Complete Guide to Wireless Audio in 2026",
        category: "Guides",
        date: "Sep 12, 2026",
        read: "6 min",
        comments: 24,
        excerpt:
            "From codecs to battery life — everything you need to know before upgrading your headphones this season.",
        img: bannerImage4,
    },
    {
        id: 2,
        title: "Nexo Store Now Ships to 12 New Countries",
        category: "News",
        date: "Sep 08, 2026",
        read: "3 min",
        comments: 9,
        excerpt:
            "Great news for our global community — faster shipping and local support just got a whole lot closer.",
        img: bannerImage1,
    },
    {
        id: 3,
        title: "Smartwatch Buying Guide: Size, Battery & Sensors",
        category: "Guides",
        date: "Sep 02, 2026",
        read: "8 min",
        comments: 31,
        excerpt:
            "Find the perfect wearable for your lifestyle with our breakdown of what specs actually matter.",
        img: heroImage1,
    },
    {
        id: 4,
        title: "Hands-On Review: Aurora Wireless Headphones",
        category: "Reviews",
        date: "Aug 27, 2026",
        read: "5 min",
        comments: 17,
        excerpt:
            "We spent two weeks with the Aurora headset. Here is the honest verdict on sound, comfort and price.",
        img: heroImage2,
    },
    {
        id: 5,
        title: "5 Charging Habits That Extend Battery Life",
        category: "Guides",
        date: "Aug 20, 2026",
        read: "4 min",
        comments: 12,
        excerpt:
            "Small daily habits that keep your devices healthy and delay that dreaded battery replacement.",
        img: bannerImage3,
    },
    {
        id: 6,
        title: "End-of-Week Deals: Weekend Bundle Sale",
        category: "Offers",
        date: "Aug 15, 2026",
        read: "2 min",
        comments: 6,
        excerpt:
            "Bundle your favorite accessories and save up to 40% — but only while stocks last this weekend.",
        img: bannerImage2,
    },
    {
        id: 7,
        title: "What's Inside the Nexo Warehouse Tour",
        category: "News",
        date: "Aug 09, 2026",
        read: "5 min",
        comments: 21,
        excerpt:
            "We took a camera around our fulfillment center to show you how orders travel from shelf to door.",
        img: heroImage3,
    },
]

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease },
})

function Blog() {
    const [activeCat, setActiveCat] = useState("All")
    const [email, setEmail] = useState("")

    const filtered = activeCat === "All" ? posts : posts.filter((p) => p.category === activeCat)
    const featured = filtered[0]
    const rest = filtered.slice(1)

    const handleSubscribe = (event) => {
        event.preventDefault()
        if (!email.trim()) return
        toast.success("You're subscribed to the Nexo newsletter!")
        setEmail("")
    }

    return (
        <PageTransition>
            <section className="blogPage">
                <div className="blogGlow" aria-hidden="true" />

                <div className="container">
                    <motion.header
                        className="blogIntro"
                        initial={{ opacity: 0, y: 26 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease }}
                    >
                        <span className="blogBadge">Our Journal</span>
                        <h1>Stories, Guides & <em>Tech News</em></h1>
                        <p>
                            Practical advice and behind-the-scenes updates from the Nexo Store team
                            — written for people who love great technology.
                        </p>
                    </motion.header>

                    <div className="blogCats" role="tablist" aria-label="Post categories">
                        {cats.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                className={`blogChip ${activeCat === cat ? "active" : ""}`}
                                onClick={() => setActiveCat(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {featured && (
                        <motion.article className="blogFeatured" {...fadeUp(0.05)}>
                            <div className="blogFeaturedImg">
                                <img src={featured.img} alt={featured.title} />
                                <span className="blogTag">{featured.category}</span>
                            </div>
                            <div className="blogFeaturedBody">
                                <div className="blogMeta">
                                    <span><FaCalendarAlt /> {featured.date}</span>
                                    <span><FaClock /> {featured.read} read</span>
                                    <span><FaCommentDots /> {featured.comments}</span>
                                </div>
                                <h2>{featured.title}</h2>
                                <p>{featured.excerpt}</p>
                            </div>
                        </motion.article>
                    )}

                    <div className="blogGrid">
                        {rest.map((post, index) => (
                            <motion.article
                                className="blogCard"
                                key={post.id}
                                {...fadeUp((index % 3) * 0.07)}
                            >
                                <div className="blogCardImg">
                                    <img src={post.img} alt={post.title} />
                                    <span className="blogTag">{post.category}</span>
                                </div>
                                <div className="blogCardBody">
                                    <div className="blogMeta">
                                        <span><FaCalendarAlt /> {post.date}</span>
                                        <span><FaClock /> {post.read}</span>
                                    </div>
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <div className="blogCardFoot">
                                        <span className="blogComments">
                                            <FaCommentDots /> {post.comments} comments
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <motion.div className="blogNewsletter" {...fadeUp(0.05)}>
                        <form className="blogNewsForm" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Enter your email address"
                                aria-label="Email address"
                            />
                            <button type="submit" className="blogNewsBtn">
                                Subscribe <FaArrowRight />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </PageTransition>
    )
}

export default Blog