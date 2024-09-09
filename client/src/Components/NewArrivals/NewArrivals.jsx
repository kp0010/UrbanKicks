import React from 'react'
import "./NewArrivals.css"
import new_arrival from "../Assets/HomeAssets/new-arrival1.png"
import data_product from "../Assets/data.js"
import { Item } from '../Item/Item'

export const NewArrivals = () => {
  return (
    <div>
        <div class="New-Arrivals">
          <h2 class="head1">New Arrivals</h2>
          <img src={new_arrival} class="new" alt='...'></img>
          <div className="New-Arrivals-item">
            {data_product.map((item,i)=>{
              return <Item key={i} id={item.id} name={item.name} />
            })}
          </div>
        </div>
        
        

    </div>
  )
}
