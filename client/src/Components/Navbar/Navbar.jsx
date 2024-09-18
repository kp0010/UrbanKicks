import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo1 from "../Assets/logo_1.png"

import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../AuthContext/AuthContext'

export const Navbar = () => {
  // const [user, setUser] = useState(null);
  // const [authenticated, setAuthenticated] = useState(false);
  // const [loggedOut, setLoggedOut] = useState(false)

  const navigate = useNavigate()

  const { auth, user, setAuth } = useAuth()

  console.log("loggest", auth, user)

  const handleLogout = () => {
    console.log("logging out fuck yall")
    fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include"
    })
      .then(() => { setAuth(false) })
  }

  const menuItemsData = [
    {
      icon: 'bi bi-search',
      url: '/',
    },
    {
      icon: 'bi bi-bag',
      url: '/',
    },
    {
      icon: 'bi bi-heart',
      url: '/',
    },
  ];

  const gotoLogin = () => {
    navigate("/login")
  }

  const Dropdown = () => {
    return (
      <div class="dropdown">
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
          <strong class="dropdown-item">Wassup</strong>
          {auth && <li><strong class="dropdown-item">Hello {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</strong></li>}
          {auth && <li><a class="dropdown-item" href="#">Settings</a></li>}
          {auth && <li><a class="dropdown-item" href="#">Profile</a></li>}
          {auth && <li><hr class="dropdown-divider" /></li>}
          {auth && <li><a class="dropdown-item" onClick={handleLogout}>Sign out</a></li>}
          {(!auth) && <Link class="dropdown-item" onClick={gotoLogin}><li>Log In</li></Link>}
        </ul>
      </div >
    )
  }

  return (
<<<<<<< Updated upstream
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
=======
    <nav>
      <div class="nav">
        <NavLink to="/"><img src={logo1} class="logo"></img></NavLink>
        <ul class="list">
          <li><NavLink to="/mens">Mens</NavLink></li>
          <li><NavLink to="/womens">Womens</NavLink></li>
          <li><NavLink to="/kids">Kids</NavLink></li>
        </ul>
        <ul class="icons menus">
          {menuItemsData.map((menu, index) => {
            return (
              <li className="menu-items"><a href={menu.url}><i class={menu.icon} /></a></li>
            );
          })}
          <li className="menu-items"><a href="#" class="nav-item d-flex align-items-center text-decoration-none dropdown-toggle active" data-bs-toggle="dropdown" e>
            <i class="bi bi-person"><Dropdown /></i>
          </a></li>
        </ul>
      </div>
    </nav>
>>>>>>> Stashed changes
  )
}
