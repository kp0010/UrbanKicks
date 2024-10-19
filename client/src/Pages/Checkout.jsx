import { useState, useEffect } from 'react'

import { useShop } from '../Context/ShopContext'
import { useAuth } from "../Context/AuthContext"
import { Link, useNavigate } from 'react-router-dom'

import { toast } from "react-toastify"
import { CSSTransition } from 'react-transition-group'
import bin_icon from "../Components/Assets/HomeAssets/bin_icon.png"

import "./CSS/Checkout.css"

export const Checkout = () => {
  const { cartData, all_products, cartCount, price, refreshCart } = useShop()
  const { user, auth } = useAuth()

  const navigate = useNavigate()

  const emptyAddr = {
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    zipCode: "",
    state: "",
    city: "",
    country: "",
    phoneNo: "",
  }

  const [newAddress, setNewAddress] = useState(emptyAddr)
  const [addresses, setAddresses] = useState([])
  const [addChanged, setAddChanged] = useState([])
  const [currShippingId, setCurrShippingId] = useState(0)

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
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
        if (data.address.length) {
          setAddresses(data.address)
        }
      })
  }, [auth, user, addChanged])


  const handleAddressInsert = (e) => {
    e.preventDefault()

    if (!auth) { return }

    if (addresses.length >= 3) {
      toast.error("Only 3 Addresses can be stored")
      return
    }

    fetch("http://localhost:8080/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mail: user.mail,
        address: newAddress
      }),
      credentials: "include",
    }).then(() => {
      setAddChanged(!addChanged)
      setNewAddress(emptyAddr)
      toast.success("Address Added")
      setIsFormVisible(false)
    })
  }

  const handleAddressDelete = (addressId) => {
    if (!auth) { return }

    fetch("http://localhost:8080/address", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        mail: user.mail,
        addressId: addressId
      }),
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setAddChanged(!addChanged)
          toast.success("Address Deleted")
        } else {
          toast.error("Could not Delelete the Address")
        }
      })
  }

  const processOrderCheckout = () => {
    if (!auth) { return }
    if (cartData.length <= 0) { toast.warn("No Products in Cart"); return }
    if (currShippingId == 0) { toast.warn("Please Select an Address"); return }

    fetch("http://localhost:8080/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        mail: user.mail,
        shippingAddressId: currShippingId
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          refreshCart()
          toast.success("Order Placed")
          navigate('/delivery', {
            state: { orderId: data.orderId },
          })
        } else {
          toast.error("Could not Place Order")
        }
      })
  }

  const handleAddress = (event) => {
    console.log(event.target.value)
    setCurrShippingId(event.target.value)
  }

  const toggleFormVisibility = () => {
    if (addresses.length >= 3) {
      toast.error("Only 3 Addresses can be stored")
      return
    }
    setIsFormVisible(prevState => !prevState);
  }

  return (
    <div className="checkout" >
      <div className="checkout-head">Checkout</div>
      <div className="checkout-main">
        <div className="checkout-left">
          <div className="checkout-left-shipping-content">
            <div className="checkout-left-shipping">
              <p>1.SHIPPING</p>
            </div>
            <div className="checkout-saved-address">
              <p><strong>Your Addresses</strong></p>
              <hr />
              {addresses.length > 0 ? (
                addresses.map((add, index) => (
                  <div key={index} className="checkout-radio-address">
                    <div className="checkout-radio">
                      <input
                        type="radio"
                        id={`address-${index}`}
                        name="saved-address"
                        value={add.addressid}
                        onChange={handleAddress}
                      />
                      <label htmlFor={`address-${index}`}><strong>{add.firstname} {add.lastname}</strong>, XXXXXX{add.phoneno.slice(-4)}
                        <br />
                        {add.addressline1}, {add.city}, {add.state}, {add.zipcode}, {add.country} </label>
                    </div>
                    
                    <img onClick={() => handleAddressDelete(add.addressid)} src={bin_icon} alt="..." />
                  </div>
                ))
              ) : (
                <p>No saved addresses available</p>
              )}
            </div>

            <div className="checkout-address-label">
              <p><strong>Add New Address</strong></p>
              <button className="plus-minus" onClick={toggleFormVisibility}>
                {isFormVisible ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M 4 10 L 16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M 4 10 L 16 10 M 10 4 L 10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                )}
              </button>

            </div>

            <CSSTransition
              in={isFormVisible === true}
              unmountOnExit
              timeout={400}
              classNames="formPrimary">
              <form className="checkout-left-address" onSubmit={handleAddressInsert}>
                <div className="checkout-row">
                  <input type="text" id="firstName" placeholder="FIRST NAME"
                    value={newAddress.firstName} onChange={((e) => setNewAddress({ ...newAddress, firstName: e.target.value }))} required />
                  <input type="text" id="lastName" placeholder="LAST NAME"
                    value={newAddress.lastName} onChange={((e) => setNewAddress({ ...newAddress, lastName: e.target.value }))} required />
                </div>
                <div className="checkout-row">
                  <input type="text" id="addressLine1" placeholder="ADDRESS LINE 1"
                    value={newAddress.addressLine1} onChange={((e) => setNewAddress({ ...newAddress, addressLine1: e.target.value }))} required />
                </div>
                <div className="checkout-row">
                  <input type="text" id="addressLine2" placeholder="ADDRESS LINE 2 (OPTIONAL)"
                    value={newAddress.addressLine2} onChange={((e) => setNewAddress({ ...newAddress, addressLine2: e.target.value }))} />
                </div>
                <div className="checkout-row">
                  <input type="number" id="zipCode" placeholder="POSTAL CODE"
                    value={newAddress.zipCode} onChange={((e) => setNewAddress({ ...newAddress, zipCode: e.target.value }))} required />
                  <input type="text" id="state" placeholder="STATE"
                    value={newAddress.state} onChange={((e) => setNewAddress({ ...newAddress, state: e.target.value }))} required />
                </div>
                <div className="checkout-row">
                  <input type="text" id="city" placeholder="CITY"
                    value={newAddress.city} onChange={((e) => setNewAddress({ ...newAddress, city: e.target.value }))} required />
                  <input type="text" id="country" placeholder="COUNTRY"
                    value={newAddress.country} onChange={((e) => setNewAddress({ ...newAddress, country: e.target.value }))} required />
                </div>
                <div className="checkout-row">
                  <input type="tel" id="phoneNo" placeholder="PHONE NUMBER"
                    value={newAddress.phoneNo} onChange={((e) => setNewAddress({ ...newAddress, phoneNo: e.target.value }))} required />
                </div>
                <div className="checkout-buttons">
                  <button type="submit" className="button-save">SAVE</button>
                  <button className="button-cancel" onClick={() => setIsFormVisible(false)}>CANCEL</button>
                </div>
              </form>
            </CSSTransition>

          </div>
          <div className="checkout-left-payment-content">
            <p className="checkout-payment">2.PAYMENT</p>
            <div className="checkout-payment-option">
              <label ><input type="radio" name="paymentoption" value="CashOnDelivery" /> Cash On Delivery</label>
              <label ><input type="radio" name="paymentoption" value="viaUPI" /> via UPI</label>
              <label ><input type="radio" name="paymentoption" value="viaCreditCard" /> via Credit Card</label>
              <label ><input type="radio" name="paymentoption" value="viaDebitCard" /> via Debit Card</label>
            </div>
            <button onClick={() => processOrderCheckout()}>Place an Order</button>
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
