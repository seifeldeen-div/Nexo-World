import { useContext } from "react"
import PageTransition from "./PageTransition"
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
import { CartContext } from "./context/CartContext"
import { useNavigate } from "react-router-dom"

function Orders() {

    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()


    return (
        <PageTransition>
            <div id="orders" className="profileCard">
                <div className="profileCardHead">
                    <div>
                        <span className="profileCardLabel">Order statue</span>
                        <h2>Recent <em>orders</em></h2>
                    </div>
                    <button onClick={()=> {
                        navigate("/cart")
                    }} type="button" className="profileLinkBtn">View all <FaChevronRight /></button>
                </div>

                <div className="profileOrders">
                    {cartItems.map((item) => {
                        return <div className="profileOrderItem delivered">
                            <div className="profileOrderIcon">
                                <img src={item.images[0]} alt={item.title} />
                            </div>
                            <div className="profileOrderMain">
                                <strong>{item.title}</strong>
                                <p> {`${item.description.slice(0,30)}.....`} </p>
                            </div>
                            {/* <div className="profileOrderDate">
                                <span>Placed on</span>
                                <strong>Sep 12, 2026</strong>
                            </div> */}
                            <div className="profileOrderStatus">
                                <span className="profileOrderStatusTag shipping"><FaTruck /> Shipping</span>
                            </div>
                            <div className="profileOrderTotal">
                                <span>Total</span>
                                <strong>$ {item.price}</strong>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </PageTransition>
    )
}

export default Orders
