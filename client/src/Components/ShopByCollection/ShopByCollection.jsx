import React from 'react'
import "./ShopByCollection.css"
import { NavLink } from 'react-router-dom'
import ShopByCollectionWomen from "../Assets/HomeAssets/ForWomen.png"
import ShopByCollectionMen from "../Assets/HomeAssets/ForMen.png"
import ShopByCollectionKid from "../Assets/HomeAssets/ForKid.png"

export const ShopByCollection = () => {

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo(0,0);
    window.location.href = event.currentTarget.href;
  };

  return (
    <div>
      <div className="collection">
      <h2 className= "heading">Shop By Collection</h2>
      <div className='banners'>
      <div><NavLink to="/women" onClick={handleClick}><img src={ShopByCollectionWomen} alt="." /></NavLink></div>
      <div><NavLink to="/men" onClick={handleClick}><img src={ShopByCollectionMen} alt="." /></NavLink></div>
      <div><NavLink to="/kids" onClick={handleClick}><img src={ShopByCollectionKid} alt="." /></NavLink></div>
      </div>
      </div>
    </div>
  )
}
