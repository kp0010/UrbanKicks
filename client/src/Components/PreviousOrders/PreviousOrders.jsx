import React, { useEffect, useState } from 'react'
import "./PreviousOrders.css"
import { useAuth } from '../../Context/AuthContext'
import { useShop } from '../../Context/ShopContext'

export const PreviousOrders = () => {
  const { auth, user } = useAuth()
  const { all_products } = useShop()

  const [orderInfo, setOrderInfo] = useState([{ orderid: "50" }])

  const getPreviousOrders = () => {
    if (!auth) { return }

    fetch("http://localhost:8080/getOrders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mail: user.mail,
      }),
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setOrderInfo(data.allOrderInfo)
        console.log(data.allOrderInfo[0])
      })
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
            console.log(product.title, " ID")
            return <>
              {/* <div className="previousOrders">
                <div className="previousOrders-orderData">
                  <div className="previousOrders-orderId">
                    <p>OrderId : {order.orderid}</p>
                    <p>ProudctId : {product.title}</p>
                  </div>
                  <div className="previousOrders-orderDate">
                    <p>ordered on {order.orderdate}</p>
                  </div>
                </div>
              </div> */}
              <div className="previousOrders">
                <div className="previousOrders-orderData">
                  <div className="previousOrders-orderId">
                    <p>OrderId : {order.orderid}</p>
                  </div>
                  <div className="previousOrders-orderDate">
                    <p>ordered on {order.orderdate}</p>               {/* simplify this */}
                  </div>
                  <div className="previousOrders-phoneno">
                    <p><strong>Phone Number :</strong> XXXXXX{order.addressInfo.phoneno.slice(-4)}</p>
                  </div>
                </div>
                <div className="previousOrders-address">
                  <p><strong>Address :</strong> {order.addressInfo.addressline1}, {order.addressInfo.city}, {order.addressInfo.state}, {order.addressInfo.country} </p>
                </div>
                <div className="previousOrders-main">
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
                        <p><strong>Size : </strong>{product.size}  |  <strong>Quantity : </strong>{product.quantity}</p>            {/* display size and quantity */}
                        <p><strong>Price : </strong>{product.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="previousOrders-payment">
                    <div className="previousOrders-payment-info">
                      <div className="previousOrders-payment-method">
                        <p><strong>Payment Method : </strong>{/* order.paymentInfo.paymenttype */}</p>
                        <p><strong>Total Amount : </strong>{order.totalamount}</p>
                        <p><strong>Status : </strong>{/* order.paymentInfo.status */}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />
              </div>

            </>
          })

        })
      }
    </>
  )
}
