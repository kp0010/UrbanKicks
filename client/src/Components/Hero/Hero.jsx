import React from 'react'
import "./Hero.css"

import hero1 from "../Assets/HomeAssets/hero_main.png"
import hero2 from "../Assets/HomeAssets/hero2.png"
import hero3 from "../Assets/HomeAssets/hero3.png"

export const Hero = () => {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={hero1} className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src={hero2} className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src={hero3} className="d-block w-100" alt="..."></img>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}
