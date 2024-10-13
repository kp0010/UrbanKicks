import React from 'react'
import "./CSS/BestSellersPage.css"
import bestsellers from '../Components/Assets/ProductData/bestsellers'
import { Item } from '../Components/Item/Item'
export const BestSellersPage = () => {
  return (
    <div className="bestsellers_page">
        <h2 className="bestsellers_head">BestSellers</h2>
        <div className="bestsellers_products">
            {bestsellers.map((item, i) => {
                return <Item key={i} id={item.id} name={item.title} subtitle={item.subtitle} image={item.img} new_price={item.price} />
            })}
        </div>
    </div>
  )
}
