import React, { useContext } from 'react'
import "./BestSellers.css"
import { useShop } from '../../Context/ShopContext.jsx'
import best_seller from "../Assets/HomeAssets/bestsellers1.png"
import data_product from '../Assets/ProductData/new_arrivals.js'
import { Item } from '../Item/Item'
import { NavLink } from 'react-router-dom'

export const BestSellers = () => {
  const { best_sellers } = useShop();
  return (
    <div>
      <div className="Best-Sellers">
        <img src={best_seller} class="new1" alt='...'></img>
        <h2 className="head2">BestSellers</h2>

        <div className="Best-Sellers-item">
          {best_sellers.slice(0,4).map((item, i) => {
            return <Item key={i} id={item.id} name={item.title} subtitle={item.subtitle} image={item.img} new_price={item.price} />
          })}
        </div>

        <div className="view-product">
          {/*Add link to product page pending*/}
          <NavLink to="/bestsellers">VIEW PRODUCTS
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M 9 2.5 L 16.5 10 L 9 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
