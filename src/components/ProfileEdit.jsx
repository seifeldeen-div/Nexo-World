import '../pages/Style/Profile.css'
import PageTransition from './PageTransition'
import { Data } from '../pages/Profile'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function ProfileEdit({setActiveSection}) {

    const [username, setUserName] = useState(Data.username || '')
    const [email, setEamil] = useState(Data.email || '')
    const [phone, setPhone] = useState(Data.phone || '')
    const [zip, setZip] = useState(Data.zip || '')
    const [city, setCity] = useState(Data.city || '')
    const [country, setCountery] = useState(Data.country || '')
    const navigate = useNavigate()

    const newData = {
        username,
        email,
        phone,
        zip,
        country,
        city
    }

    const handleUpdate = () => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {}
        const usersData = JSON.parse(localStorage.getItem("usersData")) || {}

        const oldEmail = currentUser.email
        const updatedUser = {
            ...usersData[oldEmail],
            ...newData,
        }

        if (oldEmail && oldEmail !== email) {
            delete usersData[oldEmail]
        }
        usersData[email] = updatedUser
        localStorage.setItem("usersData", JSON.stringify(usersData))

        localStorage.setItem("currentUser", JSON.stringify({
            username: updatedUser.username,
            email: updatedUser.email
        }))
        window.dispatchEvent(new Event("nexoUserChange"))

        if (oldEmail && oldEmail !== email) {
            const savedCart = localStorage.getItem("CartItems")
            const allUsersCart = savedCart
                ? JSON.parse(savedCart)
                : {}
            if (allUsersCart[oldEmail]) {
                allUsersCart[email] = allUsersCart[oldEmail]
                delete allUsersCart[oldEmail]
                localStorage.setItem("CartItems", JSON.stringify(allUsersCart))
            }

            const savedWish = localStorage.getItem("wishItems")
            const allUsersWish = savedWish
                ? JSON.parse(savedWish)
                : {}
            if (allUsersWish[oldEmail]) {
                allUsersWish[email] = allUsersWish[oldEmail]
                delete allUsersWish[oldEmail]
                localStorage.setItem("wishItems", JSON.stringify(allUsersWish))
            }
        }

        Swal.fire({
            title: "Saving changes",
            html: "Please wait, we're updating your profile...",
            timer: 1600,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            },
            customClass: {
                popup: "nexoSwalPop",
                backdrop: "nexoSwalBackdrop",
                title: "nexoSwalTitle",
                htmlContainer: "nexoSwalHtml"
            }
        }).then(() => {
            Swal.fire({
                title: "Profile updated!",
                html: "Your details have been saved successfully.",
                icon: "success",
                confirmButtonText: "Done",
                customClass: {
                    popup: "nexoSwalPop",
                    backdrop: "nexoSwalBackdrop",
                    title: "nexoSwalTitle",
                    htmlContainer: "nexoSwalHtml",
                    confirmButton: "nexoSwalConfirm"
                }
            }).then(() => {
                setTimeout(() => {
                    setActiveSection('overview')
                }, 200)
            })
        })
    }

    return (
        <PageTransition>
            <div id="edit" className="profileCard">
                <span className="profileCardLabel">Update details</span>
                <h2>Edit your <em>profile</em></h2>

                <form className="profileForm" onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdate()
                }}>
                    <div className="profileField">
                        <label htmlFor="profileName">Full name</label>
                        <input onInput={(e) => {
                            setUserName(e.target.value)
                        }} id="profileName" type="text" defaultValue={Data.username || ''} />
                    </div>
                    <div className="profileField">
                        <label htmlFor="profileEmail">Email address</label>
                        <input onInput={(e) => {
                            setEamil(e.target.value)
                        }} id="profileEmail" type="email" defaultValue={Data.email || ''} />
                    </div>
                    <div className="profileField">
                        <label htmlFor="profilePhone">Phone number</label>
                        <input onInput={(e) => {
                            setPhone(e.target.value)
                        }} id="profilePhone" type="tel" defaultValue={Data.phone || ''} />
                    </div>
                    <div className="profileField">
                        <label htmlFor="profileCountry">Country</label>
                        <input onInput={(e) => {
                            setCountery(e.target.value)
                        }} type="text" defaultValue={Data.country || ''} />
                    </div>
                    <div className="profileField">
                        <label htmlFor="profileCity">City</label>
                        <input onInput={(e) => {
                            setCity(e.target.value)
                        }} id="profileCity" type="text" defaultValue={Data.city || ''} />
                    </div>
                    <div className="profileField">
                        <label htmlFor="profileZip">ZIP / Postal code</label>
                        <input onInput={(e) => {
                            setZip(e.target.value)
                        }} id="profileZip" type="text" defaultValue={Data.zip || ''} />
                    </div>
                    <div className="profileFormActions">
                        {/* <button type="button" className="profileOutlineBtn">Cancel</button> */}
                        <button type="submit" className="profileSolidBtn">Save changes</button>
                    </div>
                </form>
            </div>
        </PageTransition>
    )
}

export default ProfileEdit
