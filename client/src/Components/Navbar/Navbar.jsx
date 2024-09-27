import React from 'react'
import './Navbar.css'
import logo1 from "../Assets/logo_1.png"

import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

export const Navbar = () => {
  const navigate = useNavigate()

  const { auth, setAuth, user, setUser } = useAuth()

  const handleLogout = () => {
    fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include"
    })
      .then(() => { setAuth(false); setUser(null) })
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

  const gotoSignup = () => {
    navigate("/signup")
  }

  const Dropdown = () => {
    const element =
      (auth) && (user !== null) ?
        (<div class="dropdown">
          <ul class="dropdown-menu dropdown-menu-dark text-small shadow" >
            <li><strong class="dropdown-item">Hello, {user.username.toUpperCase()}</strong></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" onClick={handleLogout}>Sign out</a></li>
          </ul>
        </div >)
        :
        (<div class="dropdown">
          <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
            <Link class="dropdown-item" onClick={gotoLogin}><li>Log In</li></Link>
            <Link class="dropdown-item" onClick={gotoSignup}><li>Sign Up</li></Link>
          </ul>
        </div >)

    return (element)
  }

  return (
    <nav>
      <div class="nav">
        <NavLink to="/"><img src={logo1} class="logo"></img></NavLink>
        <ul class="list">
          <li><NavLink to="/men">Men</NavLink></li>
          <li><NavLink to="/women">Women</NavLink></li>
          <li><NavLink to="/kids">Kids</NavLink></li>
        </ul>
        <ul class="icons menus">
          {menuItemsData.map((menu, index) => {
            return (
              <li className="menu-items"><a href={menu.url}><i class={menu.icon} /></a></li>
            );
          })}
          <li className="menu-items"><a href="#" class="nav-item d-flex align-items-center text-decoration-none dropdown-toggle active" data-bs-toggle="dropdown" e>
            <i class="bi bi-person"></i><Dropdown />
          </a></li>
        </ul>
      </div>
    </nav>
  )
}
