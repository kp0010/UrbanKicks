import React, { useContext, useEffect, useState } from 'react'
import "./CartItems.css"
import bin_icon from "../Assets/HomeAssets/bin_icon.png"

import { ShopContext } from '../../Context/ShopContext'
import { useAuth } from '../../Context/AuthContext'

export const CartItems = () => {
    const { all_products } = useContext(ShopContext);

    const [cartData, setCartData] = useState([])
    const [cartChanged, setCartChanged] = useState(false)
    const [loading, setLoading] = useState(true)

    const { auth, user } = useAuth()

    const getCart = () => {
        if (!auth) { return }
        fetch("http://localhost:8080/getCart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mail: user.mail,
            }),
            credentials: "include"
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.success) {
                    setCartData(data.result)
                }
                setLoading(false)
            })
    }

    useEffect(() => {
        getCart()
    }, [user, cartChanged])

    const updateCart = (productid, size, quantity) => {
        if (!(quantity <= 5 & quantity >= 1)) { return }
        if (!auth) { return }

        fetch("http://localhost:8080/updateCart", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: productid,
                mail: user.mail,
                size: size,
                quantity: quantity
            }),
            credentials: "include"
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.success) {
                    console.log(data.result[0])
                }
                setLoading(true)
                setCartChanged(!cartChanged)
            })
    }

    const deleteCart = (productid, size) => {
        if (!auth) { return }

        fetch("http://localhost:8080/updateCart", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: productid,
                mail: user.mail,
                size: size,
            }),
            credentials: "include"
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.success) {
                    console.log(data.result[0])
                }
                setLoading(true)
                setCartChanged(!cartChanged)
            })
    }


    return (
        <div className="cartItems">
            <div className="head">Shopping Cart</div>
            <h1>{loading ? "Loading" : null}</h1>
            <div className="cartItems-main">
                <div className="cartItems-data">
                    {
                        cartData.map((item, index) => {
                            const productData = all_products.find((product) => product.id === item.productid);
                            return <div className="cartItems-key">
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
                                                <button onClick={() => deleteCart(item.productid, item.size)}>
                                                    <img className='' src={bin_icon} alt="" />
                                                </button>
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
                            <p>Amount</p>       {/*subtotal amount*/}
                            <p>FREE</p>
                            <p>Amount</p>       {/*Total amount*/}
                        </div>
                    </div>
                    <hr />
                    <p className="tax-tag">All prices are including tax*</p>
                </div>
            </div>
        </div>
    )
}
