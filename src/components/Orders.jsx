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

function Orders() {
    return (
        <PageTransition>
            <div id="orders" className="profileCard">
                <div className="profileCardHead">
                    <div>
                        <span className="profileCardLabel">Order history</span>
                        <h2>Recent <em>orders</em></h2>
                    </div>
                    <button type="button" className="profileLinkBtn">View all <FaChevronRight /></button>
                </div>

                <div className="profileOrders">
                    <div className="profileOrderItem delivered">
                        <div className="profileOrderIcon"><FaBoxOpen /></div>
                        <div className="profileOrderMain">
                            <strong>#NEX-102847</strong>
                            <p>Wireless Headphones · Smart Watch · Charger</p>
                        </div>
                        <div className="profileOrderDate">
                            <span>Placed on</span>
                            <strong>Sep 12, 2026</strong>
                        </div>
                        <div className="profileOrderStatus">
                            <span className="profileOrderStatusTag"><FaCheckCircle /> Delivered</span>
                        </div>
                        <div className="profileOrderTotal">
                            <span>Total</span>
                            <strong>$348.90</strong>
                        </div>
                    </div>

                    <div className="profileOrderItem">
                        <div className="profileOrderIcon"><FaBoxOpen /></div>
                        <div className="profileOrderMain">
                            <strong>#NEX-102803</strong>
                            <p>Running Sneakers · Yoga Mat</p>
                        </div>
                        <div className="profileOrderDate">
                            <span>Placed on</span>
                            <strong>Sep 03, 2026</strong>
                        </div>
                        <div className="profileOrderStatus">
                            <span className="profileOrderStatusTag shipping"><FaTruck /> Shipping</span>
                        </div>
                        <div className="profileOrderTotal">
                            <span>Total</span>
                            <strong>$159.40</strong>
                        </div>
                    </div>

                    <div className="profileOrderItem">
                        <div className="profileOrderIcon"><FaBoxOpen /></div>
                        <div className="profileOrderMain">
                            <strong>#NEX-102761</strong>
                            <p>Minimal Backpack · Water Bottle</p>
                        </div>
                        <div className="profileOrderDate">
                            <span>Placed on</span>
                            <strong>Aug 21, 2026</strong>
                        </div>
                        <div className="profileOrderStatus">
                            <span className="profileOrderStatusTag"><FaCheckCircle /> Delivered</span>
                        </div>
                        <div className="profileOrderTotal">
                            <span>Total</span>
                            <strong>$89.70</strong>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}

export default Orders
