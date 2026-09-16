import '../pages/Style/Profile.css'
import PageTransition from './PageTransition'

function ProfileEdit() {
    return (
        <PageTransition>
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
        </PageTransition>
    )
}

export default ProfileEdit
