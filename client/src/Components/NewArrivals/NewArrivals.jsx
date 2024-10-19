import React, { useContext } from 'react'

import "./NewArrivals.css"
import { useShop } from '../../Context/ShopContext.jsx'
import new_arrival from "../Assets/HomeAssets/new-arrival1.png"
import { NavLink, useNavigate } from 'react-router-dom'

import { Item } from '../Item/Item'

export const NewArrivals = () => {
  const navigate = useNavigate();

  const { new_arrivals } = useShop();

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    const splitLink = event.currentTarget.href.split("/")
    navigate(splitLink[splitLink.length - 1])
  };

  return (
    <div>
      <div class="New-Arrivals">
        <h2 class="head1">New Arrivals</h2>
        <img src={new_arrival} class="new" alt='...'></img>

        <div className="New-Arrivals-item">
          {new_arrivals.slice(0, 4).map((item, i) => {
            return <Item key={i} id={item.productid} name={item.title} subtitle={item.subtitle} image={item.img} new_price={item.price} />
          })}
        </div>

        <div className="view-product">
          <NavLink to="/newarrivals" onClick={handleClick}>VIEW PRODUCTS
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M 9 2.5 L 16.5 10 L 9 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
