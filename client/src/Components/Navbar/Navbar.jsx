import React from 'react'
import './Navbar.css'
import logo from "../Assets/logo_1.png"

import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div class="nav">
      <NavLink to="/"><img src={logo} class="logo"></img></NavLink>
      <ul class="list">
        <li><NavLink to="/men">Men</NavLink></li>
        <li><NavLink to="/women">Women</NavLink></li>
        <li><NavLink to="/kids">Kids</NavLink></li>
      </ul>
      <ul class="icons">
        <li><i class="bi bi-search"></i></li>
        <li><NavLink to="/cart"><i class="bi bi-bag"></i></NavLink></li>
        <li><NavLink to="/Login"><i class="bi bi-person"></i></NavLink></li>
        <li><i class="bi bi-heart"></i></li>
      </ul>
    </div>
  )
}

