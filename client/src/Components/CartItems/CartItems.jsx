import { useNavigate } from "react-router-dom"
import "./CartItems.css"
import bin_icon from "../Assets/HomeAssets/bin_icon.png"

import { useShop } from '../../Context/ShopContext'
import { useAuth } from '../../Context/AuthContext'

export const CartItems = () => {
    const navigate = useNavigate()
    const { auth } = useAuth()

    if (!auth) { navigate("/login") }

    const {
        all_products,
        cartData,
        updateCart,
        deleteCart,
        price
    } = useShop()

    return (
        <div className="cartItems">
            <div className="head">Shopping Cart</div>
            <div className="cartItems-main">
                <div className="cartItems-left">
                    {
                        cartData.map((item, index) => {
                            const productData = all_products.find((product) => product.id === item.productid);
                            return <div className="cartItems-key" key={index}>
                                <div key={index} >
                                    <div className="cartItems-products">
                                        <div className="cartItems-products-left">
                                            <img src={productData.img} alt="." />
                                        </div>
                                        <div className="cartItems-products-right">
                                            <div className="cartItems-products-right-top">
                                                <div className="cartItems-products-right-title">
                                                    <h4>{productData.title}</h4>  {/*add link to product page*/}
                                                    <h5>{productData.subtitle}</h5>
                                                </div>
                                                <img onClick={() => deleteCart(item.productid, item.size)} className='' src={bin_icon} alt="" />
                                            </div>
                                            <hr />      {/*put only border bottom*/}
                                            <div className="cartItems-products-right-size">
                                                <p><span>Size: </span>{item.size}</p>
                                                <p className="cartItems-products-right-instock">In Stock</p>
                                            </div>
                                            <div className="cartItems-products-right-quantity-price">
                                                <input onChange={(e) => {
                                                    updateCart(item.productid, item.size, e.target.value)
                                                }}
                                                    className='' type="number" min={1} max={5} defaultValue={item.quantity} />
                                                <div className="cartItems-products-right-price">
                                                    ₹ {productData.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        })
                    }
                </div>

                <div className="cartItems-right">
                    <div className="cartItems-bill">
                        <h4>Price Details</h4>
                        <hr />
                        <div className="cartItems-subtotal">
                            <div className="cartItems-subtotal-left">
                                <p>Subtotal</p>
                                <p>Shipping</p>
                                <p>Total</p>
                            </div>
                            <div className="cartItems-subtotal-right">
                                <p>₹{price}</p>
                                <p>₹{price !== 0 ? "300" : "0"}</p>
                                <p>₹{price !== 0 ? price + 300 : "0"}</p>
                            </div>
                        </div>
                        <hr />
                        <p className="tax-tag">All prices are including tax*</p>
                    </div>
                    <div className="cartItems-order">
                        <p><span>Payment Method :- Cash on Delivery Only</span></p>
                        <p>Pay via VYOMA Bank Credit card</p>
                        <p><span>Address :- </span><input className="cartItems-address" type="text" /></p>
                        <p><button>Change Address</button></p>
                        <button>Place an Order</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
