import React from 'react'
import './Navbar.css'

export const Navbar = () => {
  return (
    <div className="navbar">
        <div className="nav-logo">
            {/* Need to add link on logo to direct to Home Page*/}
            <h3>WonderWalks</h3>
        </div>
        <ul className="nav-menu">
            <li>MEN</li>
            <li>WOMEN</li>
            <li>KIDS</li>
        </ul>
        <div className="search-login-cart">
            <div className="search">
                <input type="text" placeholder="Search..." className="searchInput"/>
                {/* Add img tag search icon of width and height 20px */}
            </div>

            <button>LOGIN</button>
            {/* Add img tag for cart icon */}
        </div>
    </div>
  )
}

