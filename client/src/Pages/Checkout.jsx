import "./CSS/Checkout.css"
import { useShop } from '../Context/ShopContext'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from "../Context/AuthContext"

export const Checkout = () => {
  const { cartData, all_products, cartCount, price } = useShop()
  const { user, auth } = useAuth()

  const [addresses, setAddresses] = useState([{ addressline1: "HELLO WORLD" }])
  const [addChanged, setAddChanged] = useState([])

  useEffect(() => {
    console.log("ADDRESS RETREIVE 0")
    if (!auth) { return }

    fetch("http://localhost:8080/getAddress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mail: user.mail,
      }),
      credentials: "include",
    })
      .then(resp => resp.json())
      .then(data => {
        console.log("ADDRESS RETREIVE")
        if (data.address.length) {
          setAddresses(data.address)
        }
      })
  }, [auth, user, addChanged])


  return (
    < div className="checkout" >
      {window.scrollTo(0, 0)}
      <div className="checkout-head">Checkout</div>
      <div className="checkout-main">
        <div className="checkout-left">
          <div className="checkout-left-shipping-content">
            <div className="checkout-left-shipping">
              <p>1.SHIPPING</p>
            </div>
            <div className="checkout-saved-address">
              <p>Select a Saved Address :</p>
              <select className="checkout-select-saved-address">
                <option value="relevant">Select a saved address</option>
                {addresses.length > 0 ? (
                  addresses.map((add) => {
                    { console.log("HERE", add.addressline1) }
                    return <option value="">{add.addressline1}</option>
                  })
                ) : (
                  <option value="relevant">No saved address {addresses.length}</option>
                )}
              </select>
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
                <input type="text" id="address1" placeholder="ADDRESS LINE 1" />
              </div>
              <div className="checkout-row">
                <input type="text" id="address2" placeholder="ADDRESS LINE 2 (OPTIONAL)" />
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
                <NavLink to="/delivery"><button className="button-save">SAVE</button></NavLink>
                <button className="button-cancel">CANCEL</button>
              </div>
            </div>
          </div>
          <div className="checkout-left-payment-content">
            <p className="checkout-payment">2.PAYMENT</p>
            <div className="checkout-payment-option">
              <label ><input type="radio" value="CashOnDelivery" /> Cash On Delivery</label>
              <label ><input type="radio" value="viaUPI" /> via UPI</label>
              <label ><input type="radio" value="viaCreditCard" /> via Credit Card</label>
              <label ><input type="radio" value="viaDebitCard" /> via Debit Card</label>
            </div>
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
    </div >
  )
}
