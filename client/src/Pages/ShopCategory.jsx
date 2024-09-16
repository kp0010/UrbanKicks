import React, { useContext } from 'react'
import "./CSS/ShopCategory.css"
import { ShopContext } from '../Context/ShopContext'
import { Item } from '../Components/Item/Item';

export const ShopCategory = (props) => {
    const {men_sandals} = useContext(ShopContext);
  return (
    <div className="shop-category">
        <div className="shop-category-products">
          {men_sandals.map((item, i) => {
            if (props.category===item.gender){
              return <Item key={i} id={item.id} name={item.title} image={item.img} new_price={item.price}/>
            }
            else{
              return null;
            }
          })}
        </div>
    </div>
  )
}
