import React, { useEffect, useState } from 'react'
import "./PreviousOrders.css"
import { useAuth } from '../../Context/AuthContext'
import { useShop } from '../../Context/ShopContext'

export const PreviousOrders = () => {
  const { auth, user, admin } = useAuth()
  const { all_products } = useShop()

  const [orderInfo, setOrderInfo] = useState([{ orderid: "50" }])

  const getPreviousOrders = () => {
    if (!auth) { return }

    console.log(admin, ": admin")

    fetch("http://localhost:8080/getOrders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mail: user.mail,
        admin: admin
      }),
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setOrderInfo(data.allOrderInfo)
        console.log(data.allOrderInfo[0])
      })
  }

  const convDate = (delDate) => {
    const delDateConv = new Date(delDate)

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

  useEffect(() => {
    getPreviousOrders()
  }, [auth, user])

  return (
    <>
      <hr />
      {orderInfo.length > 1 &&
        orderInfo.map((order) => {
          return order.orderItems.map((orderItem) => {
            const product = all_products.find((p) => p.productid === orderItem.productid)
            return (<>
              <div className="previousOrders">
                <div className="previousOrders-orderData">
                  <div className="previousOrders-orderId">
                    <p>OrderId : {order.orderid}</p>
                  </div>
                  <div className="previousOrders-orderDate">
                    <p>ordered on {convDate(order.orderdate)}</p>
                  </div>
                  <div className="previousOrders-phoneno">
                    <p><strong>Phone Number :</strong> XXXXXX{order.addressInfo.phoneno.slice(-4)}</p>
                  </div>
                </div>
                <div className="previousOrders-address">
                  <p><strong>Address :</strong> {order.addressInfo.addressline1}, {order.addressInfo.city}, {order.addressInfo.state}, {order.addressInfo.country} </p>
                </div>
                {order.orderItems.map((orderItem) => {
                  const product = all_products.find((p) => p.productid === orderItem.productid)
                  return < div className="previousOrders-main" >
                    <div className="previousOrders-products">
                      <div className="previousOrders-products-image">
                        <img src={product.image} alt="..." />
                      </div>
                      <div className="previousOrders-products-data">
                        <div className="previousOrders-products-data-head">
                          <h4>{product.title}</h4>
                          <h5>{product.subtitle}</h5>
                        </div>
                        <div className="previousOrders-products-size">
                          <p><strong>Size : </strong>{product.size}  |  <strong>Quantity : </strong>{product.quantity}</p>
                          <p><strong>Price : </strong>{product.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                })}
                <div className="previousOrders-payment">
                  <div className="previousOrders-payment-info">
                    <div className="previousOrders-payment-method">
                      <p><strong>Payment Method : </strong>{convSplitandTitle(order.paymentInfo.paymenttype)}</p>
                      <p><strong>Total Amount : </strong>{order.totalamount}</p>
                      <p><strong>Status : </strong>{convSplitandTitle(order.paymentInfo.status)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </>
            )
          })
        })}
    </>
  )
}
