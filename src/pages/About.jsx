import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
    FaArrowRight,
    // FaBadgeCheck,
    FaBoxOpen,
    FaCheckCircle,
    FaHandsHelping,
    FaHeadset,
    FaLightbulb,
    FaStore,
    FaThumbsUp,
    FaUsers,
} from "react-icons/fa"
import brandLogo from "../assets/img/logo.png"
import storyImage from "../assets/img/img-6.jpg"
import storyImage2 from "../assets/img/img-7.jpg"
import PageTransition from "../components/PageTransition"
import './Style/About.css'

const storyPoints = [
    { icon: FaCheckCircle, text: "Hand-picked, certified tech products" },
    { icon: FaCheckCircle, text: "Free shipping on orders over $50" },
    { icon: FaCheckCircle, text: "Hassle-free 30-day returns & warranty" },
]

const stats = [
    { icon: FaStore, value: "12+", label: "Years in Tech" },
    { icon: FaBoxOpen, value: "250K+", label: "Orders Delivered" },
    { icon: FaUsers, value: "120K+", label: "Happy Customers" },
    { icon: FaThumbsUp, value: "4.9", label: "Average Rating" },
]

const values = [
    // { icon: FaBadgeCheck, title: "Quality First", desc: "We only stock products we would use ourselves — nothing less." },
    { icon: FaHandsHelping, title: "Customer Trust", desc: "Transparent pricing and honest advice on every single order." },
    { icon: FaLightbulb, title: "Smart Innovation", desc: "Always staying ahead with the latest and most reliable tech." },
    { icon: FaHeadset, title: "Real Support", desc: "A dedicated team that answers fast and cares even faster." },
]

const team = [
    { name: "Omar Salem", role: "Founder & CEO", initials: "OS" },
    { name: "Lina Haddad", role: "Head of Products", initials: "LH" },
    { name: "Karim Adel", role: "Tech Lead", initials: "KA" },
    { name: "Nour Ayman", role: "Customer Experience", initials: "NA" },
]

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease },
})

function About() {
    return (
        <PageTransition>
            <section className="aboutPage">
                <div className="aboutGlow" aria-hidden="true" />

                <div className="container">
                    <motion.header
                        className="aboutIntro"
                        initial={{ opacity: 0, y: 26 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease }}
                    >
                        <span className="aboutBadge">
                            <img src={brandLogo} alt="Nexo Store" className="aboutBrandLogo" />
                            Who we are
                        </span>
                        <h1>The Tech Store You Can <em>Trust</em></h1>
                        <p>
                            Nexo Store is built around a simple idea — great technology should come
                            with equal parts quality, care and honest support.
                        </p>
                    </motion.header>

                    <motion.div className="aboutStory" {...fadeUp(0.05)}>
                        <div className="aboutStoryImg">
                            <img src={storyImage} alt="Nexo Store" />
                            <span className="aboutStoryBadge">Since 2014</span>
                            <div className="aboutStorySecond">
                                <img src={storyImage2} alt="Nexo Store team at work" />
                            </div>
                        </div>
                        <div className="aboutStoryBody">
                            <span className="aboutSecSub">Our story</span>
                            <h2>From a Small Cart to a Trusted Store</h2>
                            <p>
                                What started as a small shop selling accessories became a destination
                                for laptops, phones, wearables and smart home gear. We grow slowly on
                                purpose — every product we add is tested, reviewed and backed by real
                                people on our team.
                            </p>
                            <ul className="aboutStoryList">
                                {storyPoints.map((point) => {
                                    const Icon = point.icon
                                    return (
                                        <li key={point.text}>
                                            <span className="aboutStoryCheck"><Icon /></span>
                                            {point.text}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </motion.div>

                    <div className="aboutStats">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <motion.div className="aboutStat" key={stat.label} {...fadeUp(index * 0.07)}>
                                    <span className="aboutStatIcon"><Icon /></span>
                                    <strong>{stat.value}</strong>
                                    <p>{stat.label}</p>
                                </motion.div>
                            )
                        })}
                    </div>

                    <div className="aboutSection">
                        <div className="aboutHead">
                            <motion.span className="aboutSecSub" {...fadeUp()}>What we stand for</motion.span>
                            <motion.h2 {...fadeUp(0.05)}>Our Values</motion.h2>
                        </div>
                        <div className="aboutValues">
                            {values.map((value, index) => {
                                const Icon = value.icon
                                return (
                                    <motion.div className="aboutValue" key={value.title} {...fadeUp(index * 0.07)}>
                                        <span className="aboutValueIcon"><Icon /></span>
                                        <h3>{value.title}</h3>
                                        <p>{value.desc}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="aboutSection">
                        <div className="aboutHead">
                            <motion.span className="aboutSecSub" {...fadeUp()}>Meet the people</motion.span>
                            <motion.h2 {...fadeUp(0.05)}>Our Team</motion.h2>
                        </div>
                        <div className="aboutTeam">
                            {team.map((member, index) => (
                                <motion.div className="aboutMember" key={member.name} {...fadeUp(index * 0.07)}>
                                    <span className="aboutAvatar">{member.initials}</span>
                                    <h3>{member.name}</h3>
                                    <p>{member.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div className="aboutCta" {...fadeUp(0.05)}>
                        <h2>Ready to Upgrade Your Setup?</h2>
                        <p>
                            Explore the full Nexo Store catalog and find the tech that fits your life.
                        </p>
                        <div className="aboutCtaActions">
                            <Link to="/allProducts" className="aboutCtaBtn aboutCtaFill">
                                Shop All Products <FaArrowRight />
                            </Link>
                            <Link to="/contact" className="aboutCtaBtn aboutCtaGhost">
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PageTransition>
    )
}

export default About