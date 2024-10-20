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
      <h2>Previous Order</h2>
      <h1>{orderInfo[0].orderid} {orderInfo.length}</h1>
      {orderInfo.length > 1 &&
        orderInfo.map((order) => {
          return <>
            <h1>{order.addressInfo.addressline1}</h1>
          </>
        })
      }
    </>
  )
}
