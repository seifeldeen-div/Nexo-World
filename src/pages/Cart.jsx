import { useContext } from "react"
import { CartContext } from "../components/context/CartContext"
import { MdDelete } from "react-icons/md"
import { FaCartPlus } from "react-icons/fa"
import './Style/Cart.css'

function Cart() {
    const { cartItems = [] } = useContext(CartContext)
    const safeCartItems = Array.isArray(cartItems) ? cartItems : []

    const total = safeCartItems.reduce((sum, item) => sum + Number(item.price || 0), 0)

    return (
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
                                <button className="emptyBtn">Shop Products</button>
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
                                        <button type="button" aria-label="Decrease quantity">-</button>
                                        <span className="quantity">1</span>
                                        <button type="button" aria-label="Increase quantity">+</button>
                                    </div>
                                    <button type="button" className="deleteCart" aria-label="Delete item">
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
    )
}

export default Cart
