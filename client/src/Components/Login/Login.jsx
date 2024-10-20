import React, { useState } from "react"
import { Link } from 'react-router-dom'

import "./Login.css"

import logo_2 from "./../Assets/logo_2.png"
import { useAuth } from "../../Context/AuthContext"

const serverUrl = "http://localhost"
const serverPort = 8080


export const Login = () => {
  const { setAuth } = useAuth()

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const [resp, setResp] = useState(0)

  function loginUser(e) {
    e.preventDefault();

    fetch(serverUrl + ":" + serverPort + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: id, password: password }),
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        // data = {status: str, login: bool, userExists: bool}
        if (data.login) {
          setAuth(true)
          setResp(0)
          if (data.admin) {
            window.location.replace("/adminDash")
            return
          }
          window.location.replace("/")
        } else if (!data.userExists) {
          setResp(1)
        } else {
          setResp(2)
        };
      });
  }

  return (
    <div className="Login">
      <main>
        <div className="logo-placeholder">
          <img src={logo_2} alt="Logo Placeholder"></img>
        </div>
        <div className="login-container">
          <form className="login-form" onSubmit={loginUser}>
            <h2>Log-In</h2>
            <div className="input-group">
              <label htmlFor="id">Email or Phone Number</label>
              <input value={id} type="text" id="id" name="id" onChange={(e) => setId(e.target.value)} required>
              </input>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required>
              </input>
            </div>
            {resp === 1 && <p>Mail or Phone Number does not exist, please try again.</p>}
            {resp === 2 && <p>Invalid Password, please try again.</p>}
            <button type="submit" className="login-button">Login</button>
            <p className="links"><a >Forgot Password?</a></p>
            <p className="links">Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </form>
        </div>
      </main>
    </div>
  );
}

