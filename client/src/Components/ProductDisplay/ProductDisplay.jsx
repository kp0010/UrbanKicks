import React, { useContext } from 'react'
import "./ProductDisplay.css"
import { ShopContext } from '../../Context/ShopContext';

export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className = "productdisplay">
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
                <div className="productdisplay-right-oldprice">₹{product.price}</div>
            </div>
            <div className="productdisplay-right-description">{product.description}</div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-size-variety">
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                </div>
            </div>
            <div className="productdisplay-right-quantity">
                <h6>Quantity</h6>
                <div className="productdisplay-right-quantity-value">
                    <a href="">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <title>Subtract</title>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </a>

                    <input type="text" name="quantity" value="1"/>

                    <a href="">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <title>Add</title>
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </a>
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            {/*Add to wishlist or favorites*/}
            <p className="productdisplay-right-category"><span>Category : </span>{product.category}</p>
            <p className="productdisplay-right-brand"><span>Brand : </span>{product.brand}</p>
        </div>
    </div>
  )
}
