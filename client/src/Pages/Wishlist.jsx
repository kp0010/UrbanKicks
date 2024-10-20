import React from 'react'
import "./CSS/Wishlist.css"
import { useShop } from "../Context/ShopContext"
import { Item } from '../Components/Item/Item'

export const Wishlist = () => {
  const { wishlistData, all_products } = useShop()

  return (
    <div className="wishlist">
      <div className="wishlist-head">Wishlist</div>
      <div className="wishlist-products-main">
        {wishlistData.map((item, index) => {
          const product = all_products.find((p) => p.productid === item.productid);
          return <Item key={index} name={product.title} subtitle={product.subtitle} image={product.image} new_price={product.price} id={product.productid} />
        })}
      </div>

    </div>
  )
}
