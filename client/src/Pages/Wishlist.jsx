import React from 'react'
import "./CSS/Wishlist.css"
import { useAuth } from "../Context/AuthContext"
import { useShop } from "../Context/ShopContext"
import { Item } from '../Components/Item/Item'

export const Wishlist = () => {
  const { auth, user } = useAuth()
  const { wishlistData, all_products } = useShop()

  return (
    <div className="wishlist">
      <div className="wishlist-head">Wishlist</div>
      {wishlistData.length > 0 &&
        <>
          <h1>{wishlistData.length}</h1>
          
        </>}
      <div className="wishlist-products-main">
        {wishlistData.map((item, index) => {
          const product = all_products.find((p) => p.productid === item.productid);
          console.log(product);
          return <Item key={index} name={product.title} subtitle={product.subtitle} image={product.image} new_price={product.price} />
          {/*return <div className="wishlist-key" key={index}>
            <div key={index} >
               <div className="wishlist-product-item">
                <img src={product.image} alt=".." />
                <div className="wishlist-product-item-data">
                  <p>{product.title}</p>
                  <div className="wishlist-product-price">
                    <p></p>
                  </div>
                </div>
              </div> 

            </div>
            
          </div>*/}
        })}
      </div>
      
    </div>
  )
}
