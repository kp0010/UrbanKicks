import React from 'react'
import "./CSS/PreviousOrdersPage.css"
import { PreviousOrders } from '../Components/PreviousOrders/PreviousOrders'
import { useAuth } from '../Context/AuthContext'
import { useState } from 'react'
import { useEffect } from 'react'

export const PreviousOrdersPage = () => {
  const { admin } = useAuth()
  const [title, setTitle] = useState("Previous Orders")

  useEffect(() => {
    setTitle(admin ? "Users Orders" : "Previous Orders")
  }, [admin])

  return (
    <div className="PreviousOrdersPage">
      <div className="PreviousOrdersPage-head">{title}</div>
      <PreviousOrders />
    </div>
  )
}
