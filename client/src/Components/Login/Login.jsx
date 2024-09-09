/* eslint-disable */
import { React } from 'react'

import './Login.css'

// import logo_1 from "./../Assets/logo_1.png"
import logo_2 from "./../Assets/logo_2.png"

import { Navbar } from "../Navbar/Navbar"

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
        <Navbar />
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

