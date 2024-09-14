import React, { useContext } from 'react'
import "./CSS/ShopCategory.css"
import { ShopContext } from '../Context/ShopContext'
import { Item } from '../Components/Item/Item';

export const ShopCategory = (props) => {
    const {new_arrivals} = useContext(ShopContext);
  return (
    <div className="shop-category">
        <div className="shop-category-products">
          {new_arrivals.map((item, i) => {
            if (props.category===item.category){
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else{
              return null;
            }
          })}
        </div>
    </div>
  )
}
