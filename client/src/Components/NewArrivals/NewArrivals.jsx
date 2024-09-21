import React, {useContext} from 'react'

import "./NewArrivals.css"
import { ShopContext } from '../../Context/ShopContext.jsx'
import new_arrival from "../Assets/HomeAssets/new-arrival1.png"

import { Item } from '../Item/Item'

export const NewArrivals = (props) => {
  const {new_arrivals} = useContext(ShopContext);
  return (
    <div>
      <div class="New-Arrivals">
        <h2 class="head1">New Arrivals</h2>
        <img src={new_arrival} class="new" alt='...'></img>

        <div className="New-Arrivals-item">
          {new_arrivals.map((item, i) => {
            return <Item key={i} id={item.id} name={item.title} subtitle={item.subtitle} image={item.img} new_price={item.price}/>
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
