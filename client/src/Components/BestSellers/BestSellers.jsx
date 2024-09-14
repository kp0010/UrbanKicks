import React from 'react'
import "./BestSellers.css"
import new_arrival from "../Assets/HomeAssets/new-arrival1.png"

export const BestSellers = () => {
  return (
    <div>
        <div className="Best-Sellers">
            <img src={new_arrival} class="new1" alt='...'></img>
            <h2 className="head2">BestSellers</h2>
            
        </div>
    </div>
  )
}
