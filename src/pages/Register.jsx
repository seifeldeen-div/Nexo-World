import PageTransition from "../components/PageTransition"
import { Link, useNavigate } from "react-router-dom"
import { FaRegEye, FaLock, FaEnvelope, FaGoogle, FaApple, FaFacebookF, FaUserAlt, FaTruck, FaHeadset, FaShieldAlt } from "react-icons/fa"
import Logo from "../assets/img/logo.png"
import './Style/Register.css'
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"


export const handleFastLoginBtn = () => {
    toast(
        <div className="developing-toast">
            <div className="developing-icon">
                <span>⚙</span>
            </div>

            <div className="developing-content">
                <span className="developing-title">UNDER DEVELOPING</span>
                <span className="developing-text">
                    This feature is coming soon
                </span>
            </div>
        </div>,
        {
            duration: 1800,
            style: {
                padding: "0",
                background: "transparent",
                boxShadow: "none",
            },
        }
    );
}

function Register() {

    const [showPassword, setShowPassword] = useState(false)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const registerData = {
        'username': username || '',
        'email': email || '',
        'password': password || '',
        'phone': JSON.parse(localStorage.getItem("newUserData"))?.phone || '',
        'zip': JSON.parse(localStorage.getItem("registerData"))?.zip || '',
        'country': JSON.parse(localStorage.getItem("registerData"))?.country || '',
        'city': JSON.parse(localStorage.getItem("registerData"))?.city || ''
    }


    const navigate = useNavigate()
    const handleSubmit = (e, registerData) => {
        e.preventDefault()
        navigate('/login')

        const usersData = JSON.parse(localStorage.getItem("usersData")) || {}
        usersData[registerData.email] = {
            ...registerData
        }
        localStorage.setItem("usersData", JSON.stringify(usersData))
    }

    return (
        <PageTransition>
            <section className="registerPage">
                <div className="registerGlow" aria-hidden="true" />

                <div className="container">
                    <div className="registerWrapper">

                        <div className="registerPanel">
                            <div className="registerPanelBrand">
                                <img src={Logo} alt="Nexo Store" />
                                <span className="registerPanelBadge">Join today</span>
                            </div>

                            <div className="registerPanelCopy">
                                <h2>Create your account, <em>start saving</em>.</h2>
                                <p>
                                    Join thousands of happy Nexo shoppers and enjoy
                                    faster checkout, exclusive deals and your own personal wishlist.
                                </p>
                            </div>

                            <ul className="registerPanelFeatures">
                                <li>
                                    <span className="registerFeatIcon"><FaTruck /></span>
                                    <div>
                                        <strong>Free shipping</strong>
                                        <p>Free standard delivery on every order over $50.</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="registerFeatIcon"><FaHeadset /></span>
                                    <div>
                                        <strong>24/7 support</strong>
                                        <p>Our team is available around the clock for you.</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="registerFeatIcon"><FaShieldAlt /></span>
                                    <div>
                                        <strong>Safe & secure</strong>
                                        <p>Your data is protected with bank-level encryption.</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="registerPanelQuote">
                                <span>“</span>
                                <p>Average member saves $180 a year on exclusive offers.</p>
                            </div>
                        </div>

                        <div className="registerCard">
                            <span className="registerBadge">Get started</span>
                            <h1>Create <em>account</em></h1>
                            <p className="registerSub">
                                Fill in the form below to join Nexo in less than a minute.
                            </p>

                            <form action='login' method="POST" onSubmit={(e) => {
                                toast.success('Successfully Registered')
                                handleSubmit(e, registerData)
                            }} className="registerForm">
                                <div className="registerField">
                                    <label htmlFor="registerName">Full Name</label>
                                    <div className="registerInputWrap">
                                        <span className="registerInputIcon"><FaUserAlt /></span>
                                        <input onInput={(e) => {
                                            setUsername(e.target.value)
                                        }}
                                            id="registerName"
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="registerField">
                                    <label htmlFor="registerEmail">Email Address</label>
                                    <div className="registerInputWrap">
                                        <span className="registerInputIcon"><FaEnvelope /></span>
                                        <input onInput={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                            id="registerEmail"
                                            type="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="registerRow">
                                    <div className="registerField">
                                        <label htmlFor="registerPassword">Password</label>
                                        <div className="registerInputWrap">
                                            <span className="registerInputIcon"><FaLock /></span>
                                            <input onInput={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                                id="registerPassword"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                placeholder="Min 8 characters"
                                                required
                                            />
                                            <button onClick={(e) =>
                                                setShowPassword(statue => !statue)
                                            } type="button" className="registerEye" aria-label="Show password">
                                                <FaRegEye />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="registerField">
                                        <label htmlFor="registerConfirm">Confirm Password</label>
                                        <div className="registerInputWrap">
                                            <span className="registerInputIcon"><FaLock /></span>
                                            <input
                                                id="registerConfirm"
                                                type={showPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                placeholder="Repeat password"
                                                required
                                            />
                                            <button onClick={(e) =>
                                                setShowPassword(statue => !statue)
                                            } type="button" className="registerEye" aria-label="Show password">
                                                <FaRegEye />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <label className="registerTerms">
                                    <input type="checkbox" name="terms" required />
                                    <span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a></span>
                                </label>

                                <button type="submit" className="registerSubmit">
                                    Create Account
                                </button>

                                <div className="registerDivider">
                                    <span>or sign up with</span>
                                </div>

                                <div className="registerSocials">
                                    <button onClick={handleFastLoginBtn} type="button" className="registerSocial google"><FaGoogle /> Google</button>
                                    <button onClick={handleFastLoginBtn} type="button" className="registerSocial apple"><FaApple /> Apple</button>
                                    <button onClick={handleFastLoginBtn} type="button" className="registerSocial facebook"><FaFacebookF /> Facebook</button>
                                </div>
                            </form>

                            <p className="registerSwitch">
                                Already have an account? <Link to="/login">Sign in</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </PageTransition>
    )
}

export default Register