import React, { useState, useEffect } from 'react'
import "./CategoryItem.css"
import { Link } from 'react-router-dom'
import { useShop } from '../../Context/ShopContext'

export const CategoryItem = (props) => {

  const { addToWishlist, deleteWishlist, wishlistData, refreshWishlist } = useShop()

  const [liked, setLiked] = useState(" bi-heart ");

  useEffect(() => {
    const initLike = wishlistData.some(item => item.productid === props.id)
    setLiked(initLike ? " bi-heart-fill liked " : " bi-heart ")
  }, [wishlistData])

  const toggleLike = (id) => {
    console.log(id)

    if (liked === " bi-heart ") {
      console.log("true", liked)
      addToWishlist(id)
    } else {
      console.log("false", liked)
      deleteWishlist(id)
    }
    refreshWishlist()

  };

  return (
    <div className='category-item'>
      <span><i className={`bi category-heart-icon` + liked} onClick={() => toggleLike(props.id)} /></span>
      <button className="category-item-addtocart">
        ADD TO CART
      </button>
      <Link to={`/product/${props.id}`}>
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
      </Link>

    </div>
  )
}
