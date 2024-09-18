import React, { useState } from "react"

import "./Login.css"

import logo_2 from "./../Assets/logo_2.png"
import { Navbar } from "../Navbar/Navbar"
import { useAuth } from "../AuthContext/AuthContext"


const serverUrl = "http://localhost"
const serverPort = 8080


export const Login = () => {
  const { setAuth } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [resp, setResp] = useState(0)

  function loginUser(e) {
    e.preventDefault();

    fetch(serverUrl + ":" + serverPort + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        // data = {status: str, login: bool, userExists: bool}
        if (data.login) {
          // const { auth, setAuth } = useAuth()
          console.log("AUTHSET TRUE")
          setAuth(true)
          // console.log(auth)
          setUsername("")
          setPassword("")
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
    <div className="Login">
      <header>
        <Navbar />
      </header>

      <main>
        <div className="logo-placeholder">
          <img src={logo_2} alt="Logo Placeholder"></img>
        </div>
        <div className="login-container">
          <form className="login-form" onSubmit={loginUser}>
            <h2>Log-In</h2>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input value={username} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required>
              </input>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required>
              </input>
            </div>
            {resp === 1 && <p>Username does not exist, please try again.</p>}
            {resp === 2 && <p>Invalid Password, please try again.</p>}
            <button type="submit" className="login-button">Login</button>
            <p className="links"><a href="#">Forgot Password?</a></p>
            <p className="links">Don't have an account? <a href="#">Sign Up</a></p>
          </form>
        </div>
      </main>
    </div>
  );
}

