import React from 'react'
import "./CSS/Wishlist.css"
import { useAuth } from "../Context/AuthContext"
import { useShop } from "../Context/ShopContext"

export const Wishlist = () => {
  const { auth, user } = useAuth()
  const { wishlistData } = useShop()

  return (
    <div className="wishlist">
      <div className="wishlist-head">Wishlist</div>
      {wishlistData.length > 0 &&
        <>
          <h1>{wishlistData.length}</h1>
        </>}
    </div>
  )
}
