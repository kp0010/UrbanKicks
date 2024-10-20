import React, { useState } from 'react'
import "./Item.css"
import { useShop } from '../../Context/ShopContext';

export const Item = (props) => {

  const [liked, setLiked] = useState(false);

  const { addToWishlist, deleteWishlist } = useShop();

  const toggleLike = (id) => {
    setLiked((prevLiked) => {
      if (!prevLiked) {
        addToWishlist(id)
      }
      else { deleteWishlist(id) }
      return !prevLiked;
    })
  };

  return (
    <div className='item'>
      <span><i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'} heart-icon ${liked ? 'liked' : ''}`} onClick={() => toggleLike(props.id)} /></span>
      <button className="item-addtocart">ADD TO CART</button>
      <a href={`/product/${props.id}`}>
        
        <div>
          <img src={props.image} alt="." />
        </div>
        <div className="item-info">
          <p className="item-product-name">{props.name} : {props.subtitle}</p>
          <div className="item-prices">
            <div className="item-price-new">
              ₹{props.new_price}
            </div>
            <div className="item-price-old">
              ₹{Math.round(props.new_price * 1.5 / 5) * 5}
            </div>
          </div>
        </div>
      </a>

    </div>
  )
}
