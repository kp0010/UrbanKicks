import React from 'react'
import "./ShopByCollection.css"
import ShopByCollectionWomen from "../Assets/HomeAssets/ShopbyCollection-Women.png"
import ShopByCollectionMen from "../Assets/HomeAssets/ShopbyCollection-Men.png"
import ShopByCollectionKid from "../Assets/HomeAssets/ShopbyCollection-Kid.png"

export const ShopByCollection = () => {
  return (
    <div>
      <div className="collection">
      <h2 className= "heading">Shop By Collection</h2>
      <div className='banners'>
      <img src={ShopByCollectionWomen} alt="." />
      <img src={ShopByCollectionMen} alt="." />
      <img src={ShopByCollectionKid} alt="." />
      </div>
      </div>
    </div>
  )
}
