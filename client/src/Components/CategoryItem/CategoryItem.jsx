import React from 'react'
import "./CategoryItem.css"

export const CategoryItem = (props) => {
  return (
    <div className='category-item'>
        <a href="/product">
          <div>
            <img src={props.image} alt="." />
          </div>
          <button className="category-item-addtocart">
            ADD TO CART
          </button>
          <div >
            <p>{props.name} : {props.subtitle}</p>
          </div>
          <div className="category-item-prices">
            <div className="category-item-price-new">
              Rs {props.new_price}
            </div>
            <div className="category-item-price-old">
              Rs {props.old_price}
            </div>
          </div>
        </a>
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
