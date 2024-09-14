import React from 'react'

import "./NewArrivals.css"

import new_arrival from "../Assets/HomeAssets/new-arrival1.png"
import data_product from "../Assets/ProductData/new_arrivals.js"

import { Item } from '../Item/Item'

export const NewArrivals = () => {
  return (
    <div>
      <div class="New-Arrivals">
        <h2 class="head1">New Arrivals</h2>
        <img src={new_arrival} class="new" alt='...'></img>
        <div className="New-Arrivals-item">
          {data_product.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          })}
        </div>
        <div className="view-product">
          <a href="">VIEW PRODUCTS</a>
        </div>
      </div>
    </div>
  )
}
