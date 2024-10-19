import "./CSS/Checkout.css"
import { useShop } from '../Context/ShopContext'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from "../Context/AuthContext"
import { toast } from "react-toastify"

export const Checkout = () => {
  const { cartData, all_products, cartCount, price } = useShop()
  const { user, auth } = useAuth()

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
  const [addresses, setAddresses] = useState([{ addressline1: "HELLO WORLD" }])
  const [addChanged, setAddChanged] = useState([])
  const [ isFormVisible, setIsFormVisible] = useState(false);

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

    // if (
    //   emptyAddr.firstName !== newAddress.firstName &&
    //   emptyAddr.lastName !== newAddress.lastName &&
    //   emptyAddr.addressLine1 !== newAddress.addressLine1 &&
    //   emptyAddr.addressLine2 !== newAddress.addressLine2 &&
    //   emptyAddr.zipCode !== newAddress.zipCode &&
    //   emptyAddr.state !== newAddress.state &&
    //   emptyAddr.city !== newAddress.city &&
    //   emptyAddr.country !== newAddress.country &&
    //   emptyAddr.phoneNo !== newAddress.phoneNo
    // ) {
    //   toast.error("Please Enter Complete Address")
    // }

    console.log("INSERTING")
    console.log(newAddress)

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
    }).then(() => { setAddChanged(!addChanged); setNewAddress(emptyAddr) })
  }

  const toggleFormVisibility = () => {
    setIsFormVisible(prevState => !prevState);
  }

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
                <option id="default" value="relevant">Select a saved address</option>
                {addresses.length > 0 ? (
                  addresses.map((add, index) => {
                    return <option id={index} value="">{add.addressline1}</option>
                  })
                ) : (
                  <option id="none" value="relevant">No saved address {addresses.length}</option>
                )}
              </select>
            </div>
            <div className="checkout-address-label">
              <p>Add New Address</p>
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

            {isFormVisible && (
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
                  <button className="button-cancel">CANCEL</button>
                </div>
              </form>
            )}
            
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
