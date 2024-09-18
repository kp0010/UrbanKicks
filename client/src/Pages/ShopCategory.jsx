import React, { useContext } from 'react'
import "./CSS/ShopCategory.css"
import { ShopContext } from '../Context/ShopContext';
import { CategoryItem } from '../Components/CategoryItem/CategoryItem';
import banner_1 from "../Components/Assets/HomeAssets/banner1.png"

export const ShopCategory = (props) => {
    const {men_sandals} = useContext(ShopContext);
  return (
    <div className="shop-category">
      <div className="shop-category-banner">
        <img src={banner_1} alt="." />
      </div>
      <div className="shop-category-sort">
        <h4>Sorting Remaining</h4>
      </div>
      <div className="shop-category-main">
        <div className="shop-category-filters">
          <h3>Filters Remaining</h3>
        </div>
        <div className="shop-category-products">
          {men_sandals.map((item, i) => {
            if (props.category===item.gender){
              return <CategoryItem key={i} id={item.id} name={item.title} subtitle={item.subtitle} image={item.img} new_price={item.price}/>
            }
            else{
              return null;
            }
          })}
        </div>
      </div>
        
    </div>
  )
}
