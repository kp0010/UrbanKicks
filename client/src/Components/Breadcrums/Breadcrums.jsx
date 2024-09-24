import React from 'react'
import "./Breadcrums.css"

export const Breadcrums = (props) => {
    const {product} = props;
  return (
    <div className="breadcrums">
        HOME / ALL PRODUCTS / {product.gender} /{product.category} / {product.title}
    </div>
  )
}
