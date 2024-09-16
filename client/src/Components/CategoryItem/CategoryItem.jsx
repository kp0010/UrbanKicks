import React from 'react'
import "./CategoryItem.css"

export const CategoryItem = (props) => {
  return (
    <div className='category-item'>
        <img src={props.image} alt="." />
    </div>
  )
}
