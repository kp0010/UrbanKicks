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
    const [price, setPrice] = useState(0)

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

    const updatePrice = (productid, size, quantity) => {
        let cartItem = null;
        let acc = 0

        console.log("QUANT", quantity)

        for (cartItem of cartData) {
            const product = all_products.find((product) => product.id === cartItem.productid);
            if (productid === cartItem.productid & size === cartItem.size) {
                if (quantity !== undefined)
                    acc = acc + (product.price * quantity)
            }
            else {
                acc = acc + (product.price * cartItem.quantity)
            }
        }

        setPrice(acc)
    }

    const initPrice = () => {
        let cartItem = null;
        let acc = 0

        console.log("INIT: ", cartData[0])

        for (cartItem of cartData) {
            const product = all_products.find((product) => product.id === cartItem.productid);
            acc = acc + (product.price * cartItem.quantity)
        }

        setPrice(acc)
    }

    useEffect(() => {
        getCart()
    }, [user, cartChanged])

    useEffect(() => {
        console.log(cartData.length, price)
        if (cartData.length > 0 & price === 0) {
            initPrice()
        }

    }, [cartData])

    useEffect(() => {
        updatePrice()
    }, [])


    const updateCart = (productid, size, quantity) => {
        if (!(quantity <= 5 & quantity >= 1)) { return }
        if (!auth) { return }

        updatePrice(productid, size, quantity)

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
            .then(setCartChanged(!cartChanged))
    }

    const deleteCart = (productid, size) => {
        if (!auth) { return }

        updatePrice(productid, size)

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
        // setLoading(true)
        setCartChanged(!cartChanged)
    }


    return (
        <div className="cartItems">
            <div className="head">Shopping Cart</div>
            <h1>{loading ? "Loading" : null}</h1>
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
                                <p>₹300</p>
                                <p>₹{price + 300}</p>
                            </div>
                        </div>
                        <hr />
                        <p className="tax-tag">All prices are including tax*</p>
                    </div>
                    <div className="cartItems-order">
                        <p><span>Payment Method :- Cash on Delivery Only</span></p>
                        <p><span>Address :- </span><input className="cartItems-address" type="text" /></p>
                        <p><button>Change Address</button></p>
                        <button>Place an Order</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
