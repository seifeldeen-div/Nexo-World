import '../pages/Style/Profile.css'
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
import PageTransition from './PageTransition'
export default function ProfileOverview() {

    return (
        <PageTransition>
            <div id="overview" className="profileCard">
                <span className="profileCardLabel">Account overview</span>
                <h2>Personal <em>information</em></h2>

                <div className="profileInfoGrid">
                    <div className="profileInfoItem">
                        <span>Full name</span>
                        <strong>Alex Morgan</strong>
                    </div>
                    <div className="profileInfoItem">
                        <span>Email address</span>
                        <strong>alex.morgan@example.com</strong>
                    </div>
                    <div className="profileInfoItem">
                        <span>Phone number</span>
                        <strong>+1 (555) 012-3456</strong>
                    </div>
                    <div className="profileInfoItem">
                        <span>Country</span>
                        <strong>United States</strong>
                    </div>
                    <div className="profileInfoItem">
                        <span>City</span>
                        <strong>New York</strong>
                    </div>
                    <div className="profileInfoItem">
                        <span>Member since</span>
                        <strong>January 2023</strong>
                    </div>
                </div>
            </div>

            <div id="edit" className="profileCard">
                <span className="profileCardLabel">Update details</span>
                <h2>Edit your <em>profile</em></h2>

                <form className="profileForm" onSubmit={(e) => e.preventDefault()}>
                    <div className="profileField">
                        <label htmlFor="profileName">Full name</label>
                        <input id="profileName" type="text" defaultValue="Alex Morgan" />
                    </div>
                    <div className="profileField">
                        <label htmlFor="profileEmail">Email address</label>
                        <input id="profileEmail" type="email" defaultValue="alex.morgan@example.com" />
                    </div>
                    <div className="profileField">
                        <label htmlFor="profilePhone">Phone number</label>
                        <input id="profilePhone" type="tel" defaultValue="+1 (555) 012-3456" />
                    </div>
                    <div className="profileField">
                        <label htmlFor="profileCountry">Country</label>
                        <select id="profileCountry" defaultValue="US">
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                        </select>
                    </div>
                    <div className="profileField">
                        <label htmlFor="profileCity">City</label>
                        <input id="profileCity" type="text" defaultValue="New York" />
                    </div>
                    <div className="profileField">
                        <label htmlFor="profileZip">ZIP / Postal code</label>
                        <input id="profileZip" type="text" defaultValue="10001" />
                    </div>
                    <div className="profileFormActions">
                        <button type="button" className="profileOutlineBtn">Cancel</button>
                        <button type="submit" className="profileSolidBtn">Save changes</button>
                    </div>
                </form>
            </div>

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

            <div id="addresses" className="profileCard profileAddressesCard">
                <span className="profileCardLabel">Saved places</span>
                <h2>Shipping <em>addresses</em></h2>

                <div className="profileAddresses">
                    <div className="profileAddress">
                        <span className="profileAddressTag">Home</span>
                        <span className="profileCopyIcon"><FaRegCopy /></span>
                        <strong>Alex Morgan</strong>
                        <p>245 Madison Avenue, Apt 4B<br />New York, NY 10016, United States</p>
                        <p className="profileAddressPhone">+1 (555) 012-3456</p>
                        <button type="button" className="profileAddressEdit"><FaEdit /> Edit</button>
                    </div>
                    <div className="profileAddress">
                        <span className="profileAddressTag work">Work</span>
                        <span className="profileCopyIcon"><FaRegCopy /></span>
                        <strong>Alex Morgan</strong>
                        <p>101 Sixth Avenue, Suite 900<br />New York, NY 10013, United States</p>
                        <p className="profileAddressPhone">+1 (555) 012-3456</p>
                        <button type="button" className="profileAddressEdit"><FaEdit /> Edit</button>
                    </div>
                </div>
                <button type="button" className="profileOutlineBtn profileAddAddress">
                    <FaMapMarkerAlt /> Add new address
                </button>
            </div>
        </PageTransition>
    )
}
