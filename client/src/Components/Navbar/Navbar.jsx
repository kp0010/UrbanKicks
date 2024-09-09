import React from 'react'
import './Navbar.css'
import logo from "../Assets/logo_1.png"

import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div class="nav">
      <a href="#"><img src={logo} class="logo"></img></a>
      <ul class="list">
        <a> <li><NavLink to="/nav">Mens</NavLink></li> </a>
        <a> <li>Womens</li> </a>
        <a> <li>Kids</li> </a>
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

