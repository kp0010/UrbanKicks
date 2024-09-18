import React from 'react'
import "./BestSellers.css"
import new_arrival from "../Assets/HomeAssets/new-arrival1.png"
import data_product from '../Assets/ProductData/new_arrivals.js'
import { Item } from '../Item/Item'

export const BestSellers = () => {
  return (
    <div>
        <div className="Best-Sellers">
            <img src={new_arrival} class="new1" alt='...'></img>
            <h2 className="head2">BestSellers</h2>
            <div className="Best-Sellers-item">
              {data_product.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
              })}
            </div>
            <div className="view-product">
              {/*Add link to product page pending*/}
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
