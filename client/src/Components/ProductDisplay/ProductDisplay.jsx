import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import "./ProductDisplay.css"

import { useAuth } from '../../Context/AuthContext'
import { useShop } from '../../Context/ShopContext'


export const ProductDisplay = (props) => {
    const navigate = useNavigate()
    const { product } = props;

    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const { auth } = useAuth()

    const { addToCart } = useShop()

    const checkAddToCart = (productid, size, quantity) => {
        if (!auth) { toast.error("Please Login First"); navigate('/login'); return }

        if (!size) { toast.error("Please Select a Size"); return }

        addToCart(productid, size, quantity)

        toast.success("Product Added to Cart"); return
    }

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-image-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt="" />
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
                    <h1>Select Size (UK)</h1>
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
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <title>Subtract</title>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </a>

                        <input type="text" name="quantity" value={quantity} onChange={event => setQuantity(Math.max(1, Math.min(5, event.target.value)))} />

                        <a onClick={() => setQuantity(Math.min(5, quantity + 1))}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <title>Add</title>
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </a>
                    </div>
                </div>
                <button onClick={() => { checkAddToCart(product.productid, size, quantity) }} className="productdisplay-right-addToCart">ADD TO CART</button>
                {/*Add to wishlist or favorites*/}
                <p className="productdisplay-right-category"><span>Category : </span>{product.category}</p>
                <p className="productdisplay-right-brand"><span>Brand : </span>{product.brand}</p>
            </div>
        </div>
    )
}
