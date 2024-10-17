import React from 'react'
import "./CSS/Delivery.css"
import { useShop } from '../Context/ShopContext'

export const Delivery = () => {
    const { cartData, all_products, cartCount, price } = useShop();
    return (
        <div className="delivery">
            <div className="delivery-head">DELIVERY</div>
            <hr />
            <div className="delivery-info">Your Order will be delivered in 2 Days.</div>
            <hr />
            <p className="delivery-order-info">Order Information:</p>
            <div className="delivery-main">
                <div className="delivery-left">
                    {
                        cartData.map((item, index) => {
                            const productData = all_products.find((product) => product.productid === item.productid);
                            return <div className="delivery-key" key={index}>
                                <div key={index} >
                                    <div className="delivery-products">
                                        <div className="delivery-products-left">
                                            <img src={productData.image} alt="." />
                                        </div>
                                        <div className="delivery-products-right">
                                            <div className="delivery-products-right-top">
                                                <div className="delivery-products-right-title">
                                                    <h4>{productData.title}</h4>  {/*add link to product page*/}
                                                    <h5>{productData.subtitle}</h5>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="delivery-products-right-size">
                                                <p><span>Size: </span>{item.size}</p>
                                            </div>
                                            <div className="delivery-products-right-price">
                                                <span>Price:</span> ₹ {productData.price}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="delivery-right">
                    <div className="delivery-right-bill">
                        <h4>Price Details</h4>
                        <hr />
                        <div className="delivery-right-subtotal">
                            <div className="delivery-right-subtotal-left">
                                <p>Subtotal</p>
                                <p>Shipping</p>
                                <p><span>Total</span></p>
                            </div>
                            <div className="delivery-right-subtotal-right">
                                <p>₹{price}</p>
                                <p>₹{price !== 0 ? "300" : "0"}</p>
                                <p><span>₹{price !== 0 ? price + 300 : "0"}</span></p>
                            </div>
                        </div>
                        <hr />
                        <h5 className="payment-method">Payment Method: Cash On Delivery</h5>
                        <hr />
                        <h6>Address: Flat No.103, Sahyadri CHS, Sector-17, Vashi, Navi Mumbai - 400808</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
