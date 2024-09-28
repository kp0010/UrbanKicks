import React from 'react'

import { Hero } from '../Components/Hero/Hero'
import { NewArrivals } from '../Components/NewArrivals/NewArrivals'
import { ShopByCollection } from '../Components/ShopByCollection/ShopByCollection'
import { BestSellers } from '../Components/BestSellers/BestSellers'

export const Homepage = () => {
  return (
    <div>
      <Hero />
      <NewArrivals />
      <ShopByCollection />
      <BestSellers />
    </div >
  )
}
