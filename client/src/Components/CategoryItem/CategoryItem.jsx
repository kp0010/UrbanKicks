import React from 'react'
import "./CategoryItem.css"

export const CategoryItem = (props) => {
  return (
    <div className='category-item'>
        <a href="/">
          <div>
            <img src={props.image} alt="." />
          </div>
          <div >
            <p>{props.name} : {props.subtitle}</p>
          </div>
          <div className="category-item-prices">
            <div className="category-item-price-new">
              ${props.new_price}
            </div>
            <div className="category-item-price-old">
              ${props.old_price}
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
