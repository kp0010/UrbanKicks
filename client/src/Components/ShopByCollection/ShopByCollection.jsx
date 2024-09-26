import React from 'react'
import "./ShopByCollection.css"
import ShopByCollectionWomen from "../Assets/HomeAssets/ForWomen.png"
import ShopByCollectionMen from "../Assets/HomeAssets/ForMen.png"
import ShopByCollectionKid from "../Assets/HomeAssets/ForKid.png"

export const ShopByCollection = () => {
  return (
    <div>
      <div className="collection">
      <h2 className= "heading">Shop By Collection</h2>
      <div className='banners'>
      <div><img src={ShopByCollectionWomen} alt="." /></div>
      <div><img src={ShopByCollectionMen} alt="." /></div>
      <div><img src={ShopByCollectionKid} alt="." /></div>
      </div>
      </div>
    </div>
  )
}
