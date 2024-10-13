import React from 'react'
import "./CSS/NewArrivalsPage.css"
import new_arrivals from '../Components/Assets/ProductData/new_arrivals'
import { Item } from "../Components/Item/Item"

export const NewArrivalsPage = () => {
  return (
    <div className="New_Arrivals_Page">
        <h2 className="New_Arrivals_head">New Arrivals</h2>
        <div className="New_Arrvals_products">
            {new_arrivals.map((item, i) => {
                return <Item key={i} id={item.id} name={item.title} subtitle={item.subtitle} image={item.img} new_price={item.price} />
            })}
        </div>
    </div>
  )
}
