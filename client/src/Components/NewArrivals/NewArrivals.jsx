import React from 'react'
import new_arrival from "../Assets/HomeAssets/new-arrival.png"

export const NewArrivals = () => {
  return (
    <div>
        <div class="New-Arrivals">
           <h2 class="head1">New Arrivals</h2>
           <img src={new_arrival} class="new" alt='...'></img>
        </div>
    </div>
  )
}