import React, { useContext } from 'react'
import "./BestSellers.css"
import { useShop } from '../../Context/ShopContext.jsx'
import new_arrival from "../Assets/HomeAssets/bestsellers1.png"
import data_product from '../Assets/ProductData/new_arrivals.js'
import { Item } from '../Item/Item'

export const BestSellers = () => {
  const { new_arrivals } = useShop();
  return (
    <div>
      <div className="Best-Sellers">
        <img src={new_arrival} class="new1" alt='...'></img>
        <h2 className="head2">BestSellers</h2>

        <div className="Best-Sellers-item">
          {new_arrivals.map((item, i) => {
            return <Item key={i} id={item.id} name={item.title} subtitle={item.subtitle} image={item.img} new_price={item.price} />
          })}
        </div>

        <div className="view-product">
          {/*Add link to product page pending*/}
          <a href="">VIEW PRODUCTS
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M 9 2.5 L 16.5 10 L 9 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
