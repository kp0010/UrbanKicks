import React, { useState, uesEffect } from 'react'
import "./CSS/Delivery.css"
import { useShop } from '../Context/ShopContext'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const Delivery = () => {
    const { all_products } = useShop();

    const location = useLocation()
    const orderId = location.state?.orderId

    const [orderInfo, setOrderInfo] = useState({})
    const [orderItemsInfo, setOrderItemsInfo] = useState([])
    const [addressInfo, setAddressInfo] = useState({})
    const [paymentInfo, setPaymentInfo] = useState({})

    var orderDate = new Date()
    var deliveryDate = new Date()

    const [dateString, setDateString] = useState("")

    useEffect(() => {
        console.log(orderId)

        fetch("http://localhost:8080/getOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                orderId: orderId,
            }),
            credentials: "include",
        })
            .then((resp) => resp.json())
            .then((data) => {
                setOrderInfo(data.orderInfo)
                setOrderItemsInfo(data.orderItemsInfo)
                setAddressInfo(data.addressInfo)
                setPaymentInfo(data.paymentInfo)
                console.log(data.paymentInfo)
                orderDate = new Date(data.orderInfo.orderdate)
            })

    }, [orderId])

    useEffect(() => {
        const tempDate = new Date(orderDate)
        deliveryDate = tempDate.setDate(tempDate.getDate() + 3)
    }, [orderDate])


    const convDate = (delDate) => {
        const delDateConv = new Date(delDate)
        // return delDate.toString()

        const options = { day: '2-digit', year: 'numeric', month: 'long' };
        const formattedDate = delDateConv.toLocaleDateString('en-US', options);

        return formattedDate
    }

    const convSplitandTitle = (text) => {
        if (text === undefined) { return "" }
        if (text === "upi") { return "UPI" }
        return text
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    useEffect(() => { setDateString(convDate(deliveryDate)) }, [deliveryDate])

    return (
        <div className="delivery">
            <div className="delivery-head">DELIVERY</div>
            <hr />
            <div className="delivery-info">Your Order will be delivered on {dateString}</div>
            <hr />
            <p className="delivery-order-info">Order Information:</p>
            <div className="delivery-main">
                <div className="delivery-left">
                    {orderItemsInfo.length > 0 &&
                        orderItemsInfo.map((item, index) => {
                            const productData = all_products.find((product) => product.productid === item.productid);
                            return <div className="delivery-key" key={index}>
                                <div key={index} >
                                    <div className="delivery-products">
                                        <div className="delivery-products-left">
                                            <img src={productData.image} alt="." />
                                        </div>
                                        <div className="delivery-products-right">
                                            <div className="delivery-products-right-top">
                                                <div className="delivery-products-right-title">
                                                    <h4>{productData.title}</h4>  {/*add link to product page*/}
                                                    <h5>{productData.subtitle}</h5>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="delivery-products-right-size">
                                                <p><span>Size: </span>{item.size.toString()}  |  <span>Quantity: </span>{item.quantity.toString()}</p>
                                            </div>
                                            <div className="delivery-products-right-price">
                                                <span>Price:</span> ₹ {item.price}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="delivery-right">
                    <div className="delivery-right-bill">
                        <h4>Price Details</h4>
                        <hr />
                        <div className="delivery-right-subtotal">
                            <div className="delivery-right-subtotal-left">
                                <p>Subtotal</p>
                                <p>Shipping</p>
                                <p><span>Total</span></p>
                            </div>
                            <div className="delivery-right-subtotal-right">
                                <p>₹{parseFloat(orderInfo.totalamount) - 300}</p>
                                <p>₹{orderInfo.totalamount !== 0 ? "300" : "0"}</p>
                                <p><span>₹{orderInfo.totalamount !== 0 ? parseFloat(orderInfo.totalamount) : "0"}</span></p>
                            </div>
                        </div>
                        <hr />
                        {paymentInfo !== undefined &&
                            <>
                                <h5 className="payment-method">Payment Method: {convSplitandTitle(paymentInfo.paymenttype)}</h5>
                                <h6 className="payment-method">Payment Status: {convSplitandTitle(paymentInfo.status)}</h6>
                            </>
                        }
                        <hr />
                        {addressInfo.addressline1 !== undefined &&
                            <>
                                <h5>Respondant Name: {addressInfo.firstname + " " + addressInfo.lastname},</h5>
                                <h6>Contact No: XXXXXX{addressInfo.phoneno.slice(-4)}</h6>
                                <h6>Address: {addressInfo.addressline1}</h6>
                                <h6>{addressInfo.addressline2}</h6>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
