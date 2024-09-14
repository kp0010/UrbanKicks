import React, { useState, useEffect } from 'react'

import { Hero } from '../Components/Hero/Hero'
import { NewArrivals } from '../Components/NewArrivals/NewArrivals'
import { ShopByCollection } from '../Components/ShopByCollection/ShopByCollection'
import { BestSellers } from '../Components/BestSellers/BestSellers'

export const Homepage = () => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/user", {
      method: "GET",
      credentials: 'include'
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.authenticated) {
          setAuthenticated(true)
          setUser(data.user)
        } else {
          setAuthenticated(false)
        }
      })
  }, [])

  const handleLogout = () => {
    fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include"
    })
      .then(() => { setAuthenticated(false); setUser(null) })
  }

  return (
    <div>
      {authenticated ? (<h1>Hello,  {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1>) : (<h1>notauth</h1>)}
      <button onClick={handleLogout}>
        Logout
      </button>
      <Hero />
      <NewArrivals />
      <ShopByCollection />
      <BestSellers />
    </div >
  )
}
