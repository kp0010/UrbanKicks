import React, { useState } from 'react'
import "./CategoryItem.css"
import { NavLink } from 'react-router-dom'

export const CategoryItem = (props) => {

  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prevLiked) => {
      return !prevLiked;
    })
  };

  return (
    <div className='category-item'>
      <span><i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'} category-heart-icon ${liked ? 'liked' : ''}`} onClick={toggleLike} /></span>
      <button className="category-item-addtocart">
        ADD TO CART
      </button>
      <NavLink to={`/product/${props.id}`}>
        <div>
          <img src={props.image} alt="." />
        </div>
        <div>
          <p className='product-name'>{props.name} : {props.subtitle}</p>
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
