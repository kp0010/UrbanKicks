import React, { useState, Redirect } from 'react'

import './Login.css'

import logo_2 from "./../Assets/logo_2.png"

import { Navbar } from "../Navbar/Navbar"

const serverUrl = "http://localhost"
const serverPort = 8080


export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [resp, setResp] = useState(0)

  function loginUser(e) {
    e.preventDefault();

    fetch(serverUrl + ":" + serverPort + "/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        // data = {status: str, login: bool, userExists: bool}
        if (data.login) {
          setResp(0)
          window.location.replace("/")
        } else if (!data.userExists) {
          setResp(1)
        } else {
          setResp(2)
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
            <div class="input-group">
              <label for="username">Username</label>
              <input value={username} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required>
              </input>
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required>
              </input>
            </div>
            {resp === 1 && <p>Username does not exist, please try again.</p>}
            {resp === 2 && <p>Invalid Password, please try again.</p>}
            <button type="submit" class="login-button">Login</button>
            <p class="links"><a href="#">Forgot Password?</a></p>
            <p class="links">Don't have an account? <a href="#">Sign Up</a></p>
          </form>
        </div>
      </main>
    </div>
  );
}

