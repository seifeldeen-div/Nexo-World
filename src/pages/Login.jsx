import PageTransition from "../components/PageTransition"
import { Link, useNavigate } from "react-router-dom"
import { FaRegEye, FaLock, FaEnvelope, FaGoogle, FaApple, FaFacebookF, FaShieldAlt, FaTruck, FaHeadset } from "react-icons/fa"
import Logo from "../assets/img/logo.png"
import './Style/Login.css'
import { useState } from "react"
import toast from "react-hot-toast"

function Login() {

    const [showPassword, setShowPassword] = useState(false)
    const userLoginData = JSON.parse(localStorage.getItem("usersData"))

    const [mail, setMail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleLogin = (e, userLoginData) => {
        e.preventDefault()

        if (!userLoginData) {
            toast.error("No registered user found")
            return
        }

        if (userLoginData[mail]?.email !== mail) {
            toast.error("Email is incorrect")
            return
        }

        if (userLoginData[mail]?.password !== password) {
            toast.error("Password is incorrect")
            return
        }

        const user = userLoginData[mail]

        navigate("/")
        toast.success("Successful LogedIn")
        localStorage.setItem('loginBtnStatue', 'true')
        localStorage.setItem("currentUser", JSON.stringify({
            username: user.username,
            email: user.email
        }))
        window.dispatchEvent(new Event("nexoUserChange"))
    }

    return (
        <PageTransition>
            <section className="loginPage">
                <div className="loginGlow" aria-hidden="true" />

                <div className="container">
                    <div className="loginWrapper">

                        <div className="loginPanel">
                            <div className="loginPanelBrand">
                                <img src={Logo} alt="Nexo Store" />
                                <span className="loginPanelBadge">Member area</span>
                            </div>

                            <div className="loginPanelCopy">
                                <h2>Shop smarter, <em>sign in faster</em>.</h2>
                                <p>
                                    Access your personal Nexo account to track orders,
                                    manage returns and unlock members-only offers.
                                </p>
                            </div>

                            <ul className="loginPanelFeatures">
                                <li>
                                    <span className="loginFeatIcon"><FaTruck /></span>
                                    <div>
                                        <strong>Quick checkout</strong>
                                        <p>Your details are saved for one-click ordering.</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="loginFeatIcon"><FaHeadset /></span>
                                    <div>
                                        <strong>Priority support</strong>
                                        <p>Members skip the line with our support team.</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="loginFeatIcon"><FaShieldAlt /></span>
                                    <div>
                                        <strong>Secure account</strong>
                                        <p>Bank-level encryption keeps your data safe.</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="loginPanelQuote">
                                <span>“</span>
                                <p>Over 120,000 shoppers trust Nexo every month.</p>
                            </div>
                        </div>

                        <div className="loginCard">
                            <span className="loginBadge">Welcome back</span>
                            <h1>Sign in to <em>Nexo</em></h1>
                            <p className="loginSub">
                                Enter your credentials to continue to your account.
                            </p>

                            <form onSubmit={(e) => {
                                handleLogin(e, userLoginData)
                            }} className="loginForm">
                                <div className="loginField">
                                    <label htmlFor="loginEmail">Email Address</label>
                                    <div className="loginInputWrap">
                                        <span className="loginInputIcon"><FaEnvelope /></span>
                                        <input onInput={(e) => {
                                            setMail(e.target.value)
                                        }}
                                            id="loginEmail"
                                            type="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="loginField">
                                    <label htmlFor="loginPassword">Password</label>
                                    <div className="loginInputWrap">
                                        <span className="loginInputIcon"><FaLock /></span>
                                        <input onInput={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                            id="loginPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <button onClick={() => {
                                            setShowPassword(statue => !statue)
                                        }} type="button" className="loginEye" aria-label="Show password">
                                            <FaRegEye />
                                        </button>
                                    </div>
                                </div>

                                <div className="loginMeta">
                                    <label className="loginRemember">
                                        <input type="checkbox" name="remember" />
                                        <span>Remember me</span>
                                    </label>
                                    <a href="#forgot" className="loginForgot">Forgot password?</a>
                                </div>

                                <button type="submit" className="loginSubmit">
                                    Sign In
                                </button>

                                <div className="loginDivider">
                                    <span>or continue with</span>
                                </div>

                                <div className="loginSocials">
                                    <button type="button" className="loginSocial google"><FaGoogle /> Google</button>
                                    <button type="button" className="loginSocial apple"><FaApple /> Apple</button>
                                    <button type="button" className="loginSocial facebook"><FaFacebookF /> Facebook</button>
                                </div>
                            </form>

                            <p className="loginSwitch">
                                New to Nexo? <Link to='/register'>Create an account</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </PageTransition>
    )
}

export default Login