import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import "./ProductDisplay.css"

import { useAuth } from '../../Context/AuthContext'

export const ProductDisplay = (props) => {
    const navigate = useNavigate()
    const { product } = props;

    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const { auth, user } = useAuth()

    console.log(product)

    const addToCart = () => {
        if (!size) {
            toast.error("Select Product Size"); 
            return
        }

        if (!auth) { navigate("/login"); return }

        fetch("http://localhost:8080/updateCart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: product.id,
                mail: user.mail,
                quantity,
                size
            }),
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                // // data = {sucesss: bool, mail: str}
                // if (data.success) {
                //      Handle success notification sending here
                // } else {
                //      Handle failure notification sending here
                // }
            });
    }

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-image-list">
                    <img src={product.img} alt="" />
                    <img src={product.img} alt="" />
                    <img src={product.img} alt="" />
                    <img src={product.img} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.img} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.title}</h1>
                <h2>{product.subtitle}</h2>
                {/*can display star ratings and no. of reviews*/}
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-newprice">₹{product.price}</div>
                    <div className="productdisplay-right-oldprice">
                        ₹{Math.round(product.price * 1.5 / 5) * 5}
                    </div>
                </div>
                <div className="productdisplay-right-description">{product.description}</div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-size-variety">
                        {product.sizes.map((item, index) => (
                            <button onClick={() => setSize(item)} className={item === size ? 'border-red' : ''} key={index}>{item}</button>
                        ))}
                    </div>
                </div>
                <div className="productdisplay-right-quantity">
                    <h6>Quantity</h6>
                    <div className="productdisplay-right-quantity-value">
                        <a onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <title>Subtract</title>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </a>

                        <input type="text" name="quantity" value={quantity} onChange={event => setQuantity(Math.max(1, Math.min(5, event.target.value)))} />

                        <a onClick={() => setQuantity(Math.min(5, quantity + 1))}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <title>Add</title>
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </a>
                    </div>
                </div>
                <button onClick={() => { addToCart(product.id, size) }} className="productdisplay-right-addToCart">ADD TO CART</button>
                {/*Add to wishlist or favorites*/}
                <p className="productdisplay-right-category"><span>Category : </span>{product.category}</p>
                <p className="productdisplay-right-brand"><span>Brand : </span>{product.brand}</p>
            </div>
        </div>
    )
}
