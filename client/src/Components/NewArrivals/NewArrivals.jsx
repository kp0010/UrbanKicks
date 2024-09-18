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
          <a href="">VIEW PRODUCTS
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M 9 2.5 L 16.5 10 L 9 17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
