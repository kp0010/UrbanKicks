import React from 'react'
import "./Item.css"

export const Item = (props) => {
  return (
    <div className='item'>
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
              ₹{props.old_price}
          </div>
      </div>
    </div>
  )
}
