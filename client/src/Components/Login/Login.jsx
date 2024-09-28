import React, { useState } from "react"

import "./Login.css"

import logo_2 from "./../Assets/logo_2.png"
import { useAuth } from "../../Context/AuthContext"

const serverUrl = "http://localhost"
const serverPort = 8080


export const Login = () => {
  const { setAuth, } = useAuth()

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const [resp, setResp] = useState(0)

  function loginUser(e) {
    e.preventDefault();
    console.log(id, password)

    fetch(serverUrl + ":" + serverPort + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: id, password: password }),
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // data = {status: str, login: bool, userExists: bool}
        if (data.login) {
          setAuth(true)
          setResp(0)
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
              <label htmlFor="username">Username</label>
              <input value={id} type="text" id="id" name="id" onChange={(e) => setId(e.target.value)} required>
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
            <p className="links">Don't have an account? <a href="/signup">Sign Up</a></p>
          </form>
        </div>
      </main>
    </div>
  );
}

