import React from 'react'
import "./CategoryItem.css"
import { NavLink } from 'react-router-dom'

export const CategoryItem = (props) => {

  {/*const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo(0,0);
    window.location.href = event.currentTarget.href;
  };*/}

  return (
    <div className='category-item'>
        <NavLink to={`/product/${props.id}`} /*onClick={handleClick}*/ >
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
              ₹{props.old_price}
            </div>
          </div>
        </NavLink>
        {/*<img src={props.image} alt="." />
        <p>{props.name}</p>
        <div className="category-item-price">
          <div className="category-item-price-new">
            ${props.new_price}
          </div>
          <div className="category-item-price-old">
            ${props.old_price}
          </div>
        </div>*/}

    </div>
  )
}
