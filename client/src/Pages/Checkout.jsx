import React from 'react'
import "./CSS/Checkout.css"
import { useShop } from '../Context/ShopContext'

export const Checkout = () => {
  const { cartData, all_products, cartCount, price } = useShop()
  return (
    <div className="checkout">
      <div className="checkout-head">Checkout</div>
      <div className="checkout-main">
        <div className="checkout-left">
          <div className="checkout-left-shipping-content">
            <div className="checkout-left-shipping">
              <p>1.SHIPPING</p>
            </div>
            <div className="checkout-address-label">
              <p>Add New Address</p>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M 8 8 L 16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            
            <div className="checkout-left-address">
              <div className="checkout-row">
                <input type="text" id="firstname" placeholder="FIRST NAME" />
                <input type="text" id="lastname" placeholder="LAST NAME" />
              </div>
              <div className="checkout-row">
                <input type="text" id="address1" placeholder="ADDRESS 1" />
              </div>
              <div className="checkout-row">
                <input type="text" id="address2" placeholder="ADDRESS 2 (OPTIONAL)" />
              </div>
              <div className="checkout-row">
                <input type="number" id="postalcode" placeholder="POSTAL CODE" />
                <input type="text" id="state" placeholder="STATE" />
              </div>
              <div className="checkout-row">
                <input type="text" id="city" placeholder="CITY" />
                <input type="text" id="country" placeholder="COUNTRY" />
              </div>
              <div className="checkout-row">
                <input type="tel" id="phonenumber" placeholder="PHONE NUMBER" />
              </div>
              <div className="checkout-buttons">
                <button className="button-save">SAVE</button>
                <button className="button-cancel">CANCEL</button>
              </div>
            </div>
          </div>
          <div className="checkout-left-payment-content">
            <p className="checkout-payment">2.PAYMENT</p>
            <p className="payment-delivery-label">Pay On Delivery</p>
          </div>
        </div>
        <div className="checkout-right">
          <div className="checkout-right-bill">
            <h4>Price Details</h4>
            <hr />
            <div className="checkout-right-subtotal">
              <div className="checkout-right-subtotal-left">
                <p>Subtotal</p>
                <p>Shipping</p>
                <p>Total</p>
              </div>
              <div className="checkout-right-subtotal-right">
                <p>₹{price}</p>
                <p>₹{price !== 0 ? "300" : "0"}</p>
                <p>₹{price !== 0 ? price + 300 : "0"}</p>
              </div>
            </div>
            <hr />
            <p className="tax-tag">All prices are including tax*</p>
          </div>
          <div className="checkout-right-summary">
            <h4>Order Summary  ({cartCount})</h4>
            <hr />
            <div className="checkout-right-summary-products">
              {
                cartData.map((item, index) => {
                  const productData = all_products.find((product) => product.productid === item.productid);
                  return <div className="checkout-key" key={index}>
                    <div key={index} >
                      <div className="checkout-products">
                        <div className="checkout-products-left">
                          <img src={productData.image} alt="." />
                        </div>
                        <div className="checkout-products-right">
                          <div className="checkout-products-right-top">
                            <div className="checkout-products-right-title">
                              <h4>{productData.title}</h4>  {/*add link to product page*/}
                              <h5>{productData.subtitle}</h5>
                            </div>
                          </div>
                          <hr />
                          <div className="checkout-products-right-size">
                            <p><span>Size: </span>{item.size}</p>
                            <p className="checkout-products-right-instock">In Stock</p>
                          </div>
                          <div className="checkout-products-right-price">
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
          </div>
        </div>
      </div>
    </div>
  )
}
