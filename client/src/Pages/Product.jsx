import React, { useContext } from 'react'
import "./CSS/Product.css"
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import { Breadcrums } from '../Components/Breadcrums/Breadcrums';

export const Product = () => {
  const {men_sandals} = useContext(ShopContext);
  const {productId} = useParams();
  const product = men_sandals.find((e) => e.id === Number(productId))
  return (
    <div className="product">
      <div className="product-banner"></div>
      <Breadcrums product={product}/>
    </div>
  )
}
