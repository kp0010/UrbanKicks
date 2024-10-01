import React, { useContext, useEffect, useState } from 'react'
import "./CartItems.css"
import bin_icon from "../Assets/HomeAssets/bin_icon.png"
import { ShopContext } from '../../Context/ShopContext'

export const CartItems = () => {
    const { men_sandals, cartItems, updateQuantity, removeFromCart} = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        
        const tempData = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item]
                    })
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

  return (
    <div className="cartItems">
        <div className="head">Shopping Cart</div>
        {/*{men_sandals.map((e)=>{
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
                                    <h4>{e.title}</h4>  *add link to product page
                                    <h5>{e.subtitle}</h5>
                                    <img src="delete icon pending" alt="" />
                                </div>      {/*put only border bottom
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
        })}*/}

        {
            cartData.map((item, index) => {
                const productData = men_sandals.find((product) => product._id === item.id);
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
                                    {/*<div className="cartItems-products-right-quantity">
                                        <span className="quantity-minus">-</span>
                                        <input type="text" value={cartItems[e.id]}/>
                                        <span className="quantity-plus">+</span>
                                    </div>*/}
                                    <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.id, item.size, Number(e.target.value))} className='' type="number" min={1} defaultValue={item.quantity} />
                                    <img onClick={() => updateQuantity(item.id, item.size, 0)} className='' src={bin_icon} alt="" />
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
