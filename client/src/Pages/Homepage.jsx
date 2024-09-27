import React from 'react'

import { Hero } from '../Components/Hero/Hero'
import { NewArrivals } from '../Components/NewArrivals/NewArrivals'
import { ShopByCollection } from '../Components/ShopByCollection/ShopByCollection'
import { BestSellers } from '../Components/BestSellers/BestSellers'

import { useAuth } from '../Context/AuthContext'

export const Homepage = () => {
  const { auth, user } = useAuth()
  console.log("Homepage: ", auth, user)

  return (
    <div>
      <Hero />
      <NewArrivals />
      <ShopByCollection />
      <BestSellers />
    </div >
  )
}
