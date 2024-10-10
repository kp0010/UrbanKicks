import React, { useEffect, useState } from 'react'
import "./CSS/Product.css"
import { useShop } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import { Breadcrums } from '../Components/Breadcrums/Breadcrums';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay';

export const Product = () => {
  const { all_products, loading } = useShop();
  const { productId } = useParams();

  const [page, setPage] = useState(<h1>Loading</h1>)

  let product;

  useEffect(() => {
    product = all_products.find((e) => e.productid === Number(productId))
    if (product !== undefined) {
      setPage(<>
        <Breadcrums product={product} />
        <ProductDisplay product={product} />
      </>)
    }
  }, [all_products, loading])

  return (
    <div className="product">
      <div className="product-banner"></div>
      {page}
    </div>
  )
}
