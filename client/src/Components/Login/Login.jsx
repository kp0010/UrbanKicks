/* eslint-disable */
import { React } from 'react'

import './Login.css'

import logo_1 from "./../Assets/logo_1.png"
import logo_2 from "./../Assets/logo_2.png"

const serverUrl = "http://localhost"
const serverPort = 8080


export const Login = () => {

  function loginUser(e) {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    fetch(serverUrl + ":" + serverPort + "/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.login == true) {
          window.location.href = "http://localhost:3000/"
        }
      });

  }

  return (
    <div class="Login">
      <header>
        <nav class="navbar">
          <ul class="nav-links">
            <li><a href="#">Mens</a></li>
            <li><a href="#">Womens</a></li>
            <li><a href="#">Kids</a></li>
          </ul>
          <div class="nav-logo">
            <a href="#">
              <img src={logo_1} alt="Wonder Walks"></img>
            </a>
          </div>
          <div class="nav-icons">
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="Search"></img></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/3225/3225209.png" alt="Cart"></img></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="Login"></img></a>
            <a href="#"><img src="https://purepng.com/public/uploads/large/heart-icon-y1k.png" alt="Favorites"></img></a>
          </div>
        </nav>
      </header>

      <main>
        <div class="logo-placeholder">
          <img src={logo_2} alt="Logo Placeholder"></img>
        </div>
        <div class="login-container">
          <form class="login-form" onSubmit={loginUser}>
            <h2>Log-In</h2>
            .           <div class="input-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" required></input>
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required></input>
            </div>
            <button type="submit" class="login-button">Login</button>
            <p class="links"><a href="#">Forgot Password?</a></p>
            <p class="links">Don't have an account? <a href="#">Sign Up</a></p>
          </form>
        </div>
      </main>
    </div>
  );
}

