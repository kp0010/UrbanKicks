import React, { useContext } from 'react'
import "./CartItems.css"
import { ShopContext } from '../../Context/ShopContext'

export const CartItems = () => {
    const {men_sandals,cartItems,removeFromCart} = useContext(ShopContext);
  return (
    <div className="cartItems">
        <div className="head">Shopping Cart</div>
        {men_sandals.map((e)=>{
            if(cartItems[e.id]>0)
            {
                return <div>
                    <div className="cartItems-main">
                        <div className="cartItems-products">
                            <div className="cartItems-products-left">
                                <img src={e.img} alt="." />
                            </div>
                            <div className="cartItems-products-right">
                                <div className="cartItems-products-right-title">
                                    <h4>{e.title}</h4>  {/*add link to product page*/}
                                    <h5>{e.subtitle}</h5>
                                    <img src="delete icon pending" alt="" />
                                </div>      {/*put only border bottom*/}
                                <div className="cartItems-products-right-size">
                                    <p><span>Size: </span>{e.size}</p>
                                    <p>In Stock</p>
                                </div>
                                <div className="cartItems-products-right-quantity-price">
                                    <div className="cartItems-products-right-quantity">
                                        <span className="quantity-minus">-</span>
                                        <input type="text" value={cartItems[e.id]}/>
                                        <span className="quantity-plus">+</span>
                                    </div>
                                    <div className="cartItems-products-right-price">
                                        Rs {e.price}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="cartItems-bill"></div>
                    </div>
                </div>
            }
        })}
    </div>
  )
}
