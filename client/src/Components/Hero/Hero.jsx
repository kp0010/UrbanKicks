import React from 'react'
import "./Hero.css"

import hero1 from "../Assets/HomeAssets/hero_1.png"
import hero2 from "../Assets/HomeAssets/hero2.png"
import hero3 from "../Assets/HomeAssets/hero3.png"

export const Hero = () => {
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
    </div>
  )
}
