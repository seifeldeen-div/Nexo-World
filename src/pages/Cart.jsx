import { useContext } from "react"
import { CartContext } from "../components/context/CartContext"
import { MdDelete } from "react-icons/md"
import { FaCartPlus } from "react-icons/fa"
import './Style/Cart.css'
import { Link } from "react-router-dom"
import PageTransition from "../components/PageTransition"

function Cart() {

    const { cartItems = [], increaseItemCart, decreaseItemCart, deleteCrtItem } = useContext(CartContext)

    const safeCartItems = Array.isArray(cartItems) ? cartItems : []
    const total = safeCartItems.reduce((sum, item) => sum + Number(item.price || 0) * (item.quantity || 1), 0)

    console.log(cartItems)

    return (
        <PageTransition>
            <section className="cartPage">
                <div className="cartContainer">
                    <div className="cartLeftPanel">
                        <div className="cartHeader">
                            <h1 className="cartTitle">Order Summary</h1>
                            <span className="cartCount">{safeCartItems.length} Items</span>
                        </div>

                        <div className="cartItems">
                            {safeCartItems.length === 0 ? (
                                <div className="emptyCart">
                                    <FaCartPlus />
                                    <h3>Cart is empty</h3>
                                    <Link to='/allProducts' className="emptyBtn">Shop Products</Link>
                                </div>
                            ) : (
                                safeCartItems.map((item, index) => (
                                    <div className="cartItem" key={item.id ?? index}>
                                        <div className="cartImage">
                                            <img src={item.images?.[0]} alt={item.title} />
                                        </div>
                                        <div className="cartContent">
                                            <h2 className="cartProductTitle">{item.title}</h2>
                                            <div className="cartProductMeta">
                                                <span>Brand: {item.brand || 'Nexo'}</span>
                                                <span>SKU: {item.id || index + 1}</span>
                                            </div>
                                            <span className="cartPrice">${item.price}</span>
                                        </div>
                                        <div className="cartQuantity">
                                            <button type="button" aria-label="Decrease quantity" onClick={() => {
                                                decreaseItemCart(item.id)
                                            }}>-</button>
                                            <span className="quantity">{item.quantity || 1}</span>
                                            <button type="button" aria-label="Increase quantity" onClick={() => {
                                                increaseItemCart(item.id)
                                            }}>+</button>
                                        </div>
                                        <button type="button" className="deleteCart" aria-label="Delete item" onClick={() => {
                                            deleteCrtItem(item.id)
                                        }}>
                                            <MdDelete />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <aside className="summaryPanel">
                        <div>
                            <h2 className="summaryTitle">Summary</h2>
                        </div>

                        <div className="summaryCard">
                            <div className="summaryRow">
                                <span>Subtotal</span>
                                <strong>${total.toFixed(2)}</strong>
                            </div>
                            <div className="summaryRow">
                                <span>Shipping</span>
                                <strong>{safeCartItems.length ? 'Free' : '$0.00'}</strong>
                            </div>
                            <div className="summaryRow">
                                <span>Tax</span>
                                <strong>${(total * 0.05).toFixed(2)}</strong>
                            </div>

                            <div className="summaryTotal">
                                <span className="totalLabel">Total</span>
                                <span className="totalPrice">${(total + total * 0.05).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="couponBox">
                            <input type="text" placeholder="Coupon code" />
                            <button type="button">Apply</button>
                        </div>

                        <button type="button" className="checkoutButton">Checkout</button>
                    </aside>
                </div>
            </section>
        </PageTransition>
    )
}

export default Cart
