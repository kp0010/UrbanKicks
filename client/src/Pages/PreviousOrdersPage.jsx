import React from 'react'
import "./CSS/PreviousOrdersPage.css"
import { PreviousOrders } from '../Components/PreviousOrders/PreviousOrders'

export const PreviousOrdersPage = () => {
  return (
    <div className="PreviousOrdersPage">
      <div className="PreviousOrdersPage-head">Previous Orders Information</div>
      <PreviousOrders />
    </div>
  )
}
