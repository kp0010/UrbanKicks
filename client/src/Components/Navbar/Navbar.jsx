import React from 'react'
import './Navbar.css'
import logo from "../Assets/logo_1.png"

import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div class="nav">
      <NavLink to="/"><img src={logo} class="logo"></img></NavLink>
      <ul class="list">
        <li><NavLink to="/mens">Mens</NavLink></li>
        <li><NavLink to="/womens">Womens</NavLink></li>
        <li><NavLink to="/kids">Kids</NavLink></li>
      </ul>
      <ul class="icons">
        <a><li><i class="bi bi-search"></i></li></a>
        <a><li><i class="bi bi-bag"></i></li></a>
        <a><li><NavLink to="/Login"><i class="bi bi-person"></i></NavLink></li></a>
        <a><li><i class="bi bi-heart"></i></li></a>
      </ul>
    </div>
  )
}

