import { useState } from "react"
import { motion } from "framer-motion"
import {
    FaEnvelope,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaPhoneAlt,
    FaRegClock,
} from "react-icons/fa"
import officeImage from "../assets/img/banner_Hero3.jpg"
import PageTransition from "../components/PageTransition"
import toast from "react-hot-toast"
import './Style/Contact.css'

const infos = [
    {
        icon: FaMapMarkerAlt,
        title: "Visit Us",
        lines: ["Nexo Store HQ", "25 Commerce Street", "Downtown, New Cairo"],
    },
    {
        icon: FaPhoneAlt,
        title: "Call Us",
        lines: ["Sales: +20 100 123 4567", "Support: +20 100 765 4321", "Mon–Sat, 9:00 – 18:00"],
    },
    {
        icon: FaEnvelope,
        title: "Email Us",
        lines: ["support@nexostore.com", "sales@nexostore.com", "We reply within 24 hours"],
    },
    {
        icon: FaRegClock,
        title: "Working Hours",
        lines: ["Mon – Fri: 9:00 AM – 6:00 PM", "Saturday: 10:00 AM – 4:00 PM", "Sunday: Closed"],
    },
]

const faqs = [
    {
        q: "How long does delivery usually take?",
        a: "Standard delivery takes 2–4 working days and is free for orders over $50. Express delivery is available at checkout.",
    },
    {
        q: "Can I return an accessory if I change my mind?",
        a: "Yes — you have 30 days from delivery to return most items in their original condition for a full refund.",
    },
    {
        q: "Do you offer warranty on accessories?",
        a: "Absolutely. Every accessory comes with at least a one-year warranty covering manufacturer defects.",
    },
    {
        q: "How can I track my order?",
        a: "Once your order ships, we email you a tracking link so you can follow your package every step of the way.",
    },
]

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease },
})

function Contact() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

    const handleChange = (event) => {
        setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        toast.success("Message sent successfully — we'll get back to you soon!")
        setForm({ name: "", email: "", subject: "", message: "" })
    }

    return (
        <PageTransition>
            <section className="contactPage">
                <div className="contactGlow" aria-hidden="true" />

                <div className="container">
                    <motion.header
                        className="contactIntro"
                        initial={{ opacity: 0, y: 26 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease }}
                    >
                        <span className="contactBadge">Get in touch</span>
                        <h1>Let's <em>Talk</em> With Us</h1>
                        <p>
                            Questions about an order, a product, or a partnership — our team is here to help.
                            Reach out and we'll get back to you within one business day.
                        </p>
                    </motion.header>

                    <motion.div className="contactGrid" {...fadeUp(0.05)}>
                        <div className="contactInfoSide">
                            <div className="contactImg">
                                <img
                                    src={officeImage}
                                    alt="Nexo Store"
                                />
                                <span className="contactImgBadge">
                                    <FaRegClock /> Online now
                                </span>
                            </div>
                            <h2>We're here to help</h2>
                            <p>
                                Prefer to chat directly? Drop by during business hours or send an email —
                                a real person will always pick up.
                            </p>
                        </div>

                        <div className="contactFormSide">
                            <form className="contactForm" onSubmit={handleSubmit}>
                                <div className="contactRow">
                                    <div className="contactField">
                                        <label htmlFor="contactName">Your Name</label>
                                        <input
                                            id="contactName"
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="contactField">
                                        <label htmlFor="contactEmail">Your Email</label>
                                        <input
                                            id="contactEmail"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="contactField">
                                    <label htmlFor="contactSubject">Subject</label>
                                    <input
                                        id="contactSubject"
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        required
                                    />
                                </div>
                                <div className="contactField">
                                    <label htmlFor="contactMessage">Message</label>
                                    <textarea
                                        id="contactMessage"
                                        name="message"
                                        rows="6"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell us a little more about your request..."
                                        required
                                    />
                                </div>
                                <button type="submit" className="contactSubmit">
                                    Send Message <FaPaperPlane />
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    <motion.div className="contactInfoGrid" {...fadeUp(0.05)}>
                        {infos.map((info, index) => {
                            const Icon = info.icon
                            return (
                                <div className="contactInfoCard" key={info.title}>
                                    <span className="contactInfoIcon">
                                        <Icon />
                                    </span>
                                    <h3>{info.title}</h3>
                                    {info.lines.map((line) => (
                                        <p key={line}>{line}</p>
                                    ))}
                                </div>
                            )
                        })}
                    </motion.div>

                    <div className="contactFaq">
                        <div className="secHead">
                            <motion.span className="contactSecSub" {...fadeUp()}>Need more answers?</motion.span>
                            <motion.h2 {...fadeUp(0.05)}>Frequently Asked Questions</motion.h2>
                        </div>
                        <div className="contactFaqList">
                            {faqs.map((faq, index) => (
                                <motion.details
                                    className="contactFaqItem"
                                    key={faq.q}
                                    {...fadeUp(index * 0.06)}
                                >
                                    <summary>{faq.q}</summary>
                                    <p>{faq.a}</p>
                                </motion.details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PageTransition>
    )
}

export default Contact