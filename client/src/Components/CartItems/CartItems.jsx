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
    console.log(auth, user)

    const getCartInfo = () => {
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
        getCartInfo()
    }, user)

    return (
        <div className="cartItems">
            <h1>{auth.toString()}</h1>
            <div className="head">Shopping Cart</div>
            <h1>{loading ? "Loading" : null}</h1>
            {
                cartData.map((item, index) => {
                    const productData = all_products.find((product) => product._id === item.id);
                    console.log(productData);

                    return <div>
                        <div key={index} className="cartItems-main">
                            <div className="cartItems-products">
                                <div className="cartItems-products-left">
                                    <img src={productData.img} alt="." />
                                </div>
                                <div className="cartItems-products-right">
                                    <div className="cartItems-products-right-title">
                                        <h4>{productData.title}</h4>  {/*add link to product page*/}
                                        <h5>{productData.subtitle}</h5>
                                        <img src="delete icon pending" alt="" />
                                    </div>      {/*put only border bottom*/}
                                    <div className="cartItems-products-right-size">
                                        <p><span>Size: </span>{item.size}</p>
                                        <p>In Stock</p>
                                    </div>
                                    <div className="cartItems-products-right-quantity-price">
                                        <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : null} className='' type="number" min={1} defaultValue={item.quantity} />
                                        <img onClick={() => null} className='' src={bin_icon} alt="" />
                                        <div className="cartItems-products-right-price">
                                            Rs {productData.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cartItems-bill"></div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}
