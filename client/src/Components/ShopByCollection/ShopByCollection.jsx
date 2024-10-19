import React from 'react'
import "./ShopByCollection.css"
import { Link, useNavigate } from 'react-router-dom'
import ShopByCollectionWomen from "../Assets/HomeAssets/ForWomen.png"
import ShopByCollectionMen from "../Assets/HomeAssets/ForMen.png"
import ShopByCollectionKid from "../Assets/HomeAssets/ForKid.png"

export const ShopByCollection = () => {
  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo(0,0);
    const splitLink = event.currentTarget.href.split("/")
    navigate(splitLink[splitLink.length - 1])
  };

  return (
    <div>
      <div className="collection">
      <h2 className= "heading">Shop By Collection</h2>
      <div className='banners'>
      <div><Link to="/women" onClick={handleClick}><img src={ShopByCollectionWomen} alt="." /></Link></div>
      <div><Link to="/men" onClick={handleClick}><img src={ShopByCollectionMen} alt="." /></Link></div>
      <div><Link to="/kids" onClick={handleClick}><img src={ShopByCollectionKid} alt="." /></Link></div>
      </div>
      </div>
    </div>
  )
}
