import { useEffect, useState } from 'react'
import './Navbar.css'
import logo1 from "../Assets/logo_1.png"

import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { useShop } from '../../Context/ShopContext'

export const Navbar = () => {
  const navigate = useNavigate()

  const { auth, setAuth, user, setUser } = useAuth()

  const [dropdown, setDropdown] = useState("")

  const { cartCount, wishlistData } = useShop()

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
      url: '/cart',
    },
    {
      icon: 'bi bi-heart',
      url: '/wishlist',
    },
  ];

  const gotoLogin = () => {
    navigate("/login")
  }

  const gotoSignup = () => {
    navigate("/signup")
  }

  const gotoPreviousOrders = () => {
    navigate("/previousOrders")
  }

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

  const Dropdown = () => {
    if ((auth) && user !== null) {
      setDropdown(
        <div className="dropdown">
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow" >
            <li id="1"><strong className="dropdown-item">Hello, {toTitleCase(user.fullname)}</strong></li>
            <li id="2" className="dropdown-item" onClick={gotoPreviousOrders} >Previous Orders</li>
            <li id="3" className="dropdown-item" href="#">Profile</li>
            <li id="4"><hr className="dropdown-divider" /></li>
            <li id="5" className="dropdown-item" onClick={handleLogout}>Log out</li>
          </ul>
        </div >)
    }
    else {
      setDropdown(
        <div className="dropdown">
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li className="dropdown-item" onClick={gotoLogin}>Log In</li>
            <li id="1"><hr className="dropdown-divider" /></li>
            <li className="dropdown-item" onClick={gotoSignup}>Sign Up</li>
          </ul>
        </div >)
    }
  }

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    const splitLink = event.currentTarget.href.split("/")
    navigate(splitLink[splitLink.length - 1])
  };

  useEffect(() => { Dropdown() }, [auth, user])

  return (
    <nav>
      <div className="nav" id="main">
        <NavLink to="/" onClick={handleClick} ><img src={logo1} className="logo"></img></NavLink>
        <ul className="list">
          <li><NavLink to="/men" onClick={handleClick} >Men</NavLink></li>
          <li><NavLink to="/women" onClick={handleClick} >Women</NavLink></li>
          <li><NavLink to="/kids" onClick={handleClick} >Kids</NavLink></li>
        </ul>
        <ul className="icons menus">
          {menuItemsData.map((menu, index) => {
            return (
              <li key={index} className="menu-items">
                <NavLink to={menu.url} onClick={handleClick}>
                  <i className={menu.icon} />
                  {(menu.icon === 'bi bi-bag' && cartCount > 0) && (
                    <span className="cart-count nav-indicator">{cartCount}</span>
                  )}
                  {(menu.icon === 'bi bi-heart' && wishlistData.length > 0) && (
                    console.log("Count:",wishlistData.length),
                    <span className="wishlist-count nav-indicator">{wishlistData.length}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
          <li className="menu-items"><Link className="nav-item d-flex align-items-center text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
            <i className="bi bi-person"></i>{dropdown}
          </Link></li>
        </ul>
      </div>
    </nav>
  )
}
