import React from 'react'
import "./CSS/Checkout.css"
import { useShop } from '../Context/ShopContext'

export const Checkout = () => {
  const { price } = useShop()
  return (
    <div className="checkout">
      <div className="checkout-head">Checkout</div>
      <div className="checkout-main">
        <div className="checkout-left">
          <div className="checkout-left-shipping-content">
            <div className="checkout-left-shipping">
              <p>1.SHIPPING</p>
            </div>
            <p className="checkout-address-label">Add New Address</p>
            <div className="checkout-left-address">
              <div className="checkout-row">
                <input type="text" id="firstname" placeholder="FIRST NAME"/>
                <input type="text" id="lastname" placeholder="LAST NAME"/>
              </div>
              <div className="checkout-row">
                <input type="text" id="address1" placeholder="ADDRESS 1"/>
              </div>
              <div className="checkout-row">
                <input type="text" id="address2" placeholder="ADDRESS 2 (OPTIONAL)"/>
              </div>
              <div className="checkout-row">
                <input type="number" id="postalcode" placeholder="POSTAL CODE"/>
                <input type="text" id="state" placeholder="STATE"/>
              </div>
              <div className="checkout-row">
                <input type="text" id="city" placeholder="CITY"/>
                <input type="text" id="country" placeholder="COUNTRY"/>
              </div>
              <div className="checkout-row">
                <input type="tel" id="phonenumber" placeholder="PHONE NUMBER"/>
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
        </div>
      </div>
    </div>
  )
}
