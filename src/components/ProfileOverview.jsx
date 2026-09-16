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
import { Data } from '../pages/Profile'
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
                        <strong> {Data.username} </strong>
                    </div>
                    <div className="profileInfoItem">
                        <span>Email address</span>
                        <strong> {Data.email} </strong>
                    </div>
                    <div className="profileInfoItem">
                        <span>Phone number</span>
                        <strong>Not Assigned</strong>
                    </div>
                    <div className="profileInfoItem">
                        <span>Country</span>
                        <strong>Not Assigned</strong>
                    </div>
                    <div className="profileInfoItem">
                        <span>City</span>
                        <strong>Not Assigned</strong>
                    </div>
                    <div className="profileInfoItem">
                        <span>Role</span>
                        <strong>Member</strong>
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
