import React from 'react'
import "./Item.css"
import { NavLink } from 'react-router-dom'

export const Item = (props) => {
  return (
    <div className='item'>
      <NavLink to={`/product/${props.id}`}>
        <div>
          <img src={props.image} alt="."/>
        </div>
        <button className="item-addtocart">ADD TO CART</button>
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
