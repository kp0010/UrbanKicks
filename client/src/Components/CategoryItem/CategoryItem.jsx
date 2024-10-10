import React from 'react'
import "./CategoryItem.css"
import { NavLink } from 'react-router-dom'

export const CategoryItem = (props) => {

  return (
    <div className='category-item'>
      <NavLink to={`/product/${props.id}`}>
        <div>
          <img src={props.image} alt="." />
        </div>
        <button className="category-item-addtocart">
          ADD TO CART
        </button>
        <div>
          <p class='product-name'>{props.name} : {props.subtitle}</p>
        </div>
        <div className="category-item-prices">
          <div className="category-item-price-new">
            ₹{props.new_price}
          </div>
          <div className="category-item-price-old">
            ₹{Math.round(props.new_price * 1.5 / 5) * 5}
          </div>
        </div>
      </NavLink>

    </div>
  )
}
