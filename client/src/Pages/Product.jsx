import React, { useContext } from 'react'
import "./CSS/Product.css"
import { useShop } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import { Breadcrums } from '../Components/Breadcrums/Breadcrums';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay';

export const Product = () => {
  const { all_products } = useShop();
  const { productId } = useParams();

  const product = all_products.find((e) => e.id === Number(productId))
  return (
    <div className="product">
      <div className="product-banner"></div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
    </div>
  )
}
