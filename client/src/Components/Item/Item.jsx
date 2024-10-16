import React, { useState } from 'react'
import "./Item.css"
import { NavLink } from 'react-router-dom'

export const Item = (props) => {

  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prevLiked) => {
      return !prevLiked;
    })
  };

  return (
    <div className='item'>
      <span><i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'} heart-icon ${liked ? 'liked' : ''}`} onClick={toggleLike} /></span>
      <button className="item-addtocart">ADD TO CART</button>
      <NavLink to={`/product/${props.id}`}>
        <div>
            <img src={props.image} alt="."/>
        </div>
        <div >
          <p>{props.name} : {props.subtitle}</p>
        </div>  
        
        <div className="item-prices">
            <div className="item-price-new">
                ₹{props.new_price}
            </div>
              <div className="item-price-old">
              ₹{Math.round(props.new_price * 1.5 / 5) * 5}
            </div>
        </div>
      </NavLink>
      
    </div>
  )
}
