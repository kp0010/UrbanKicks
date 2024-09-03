import React from 'react'

import './Home.css'

import hero1 from "./HomeAssets/hero1.png"
import hero2 from "./HomeAssets/hero2.png"
import hero3 from "./HomeAssets/hero3.png"
import logo from "../Assests/logo.png"

import { NavLink } from 'react-router-dom'


export const Home = () => {
  return (
    <div>
      <div id="carouselExampleFade" class="carousel slide carousel-fade">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={hero1} class="d-block w-100" alt="..."></img>
          </div>
          <div class="carousel-item">
            <img src={hero2} class="d-block w-100" alt="..."></img>
          </div>
          <div class="carousel-item">
            <img src={hero3} class="d-block w-100" alt="..."></img>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>


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
          <a><li><i class="bi bi-person"></i></li></a>
          <a><li><i class="bi bi-heart"></i></li></a>
        </ul>
      </div>
    </div >
  )
}

