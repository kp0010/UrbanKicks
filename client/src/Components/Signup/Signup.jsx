import React, { useState } from "react"

import "./Signup.css"

import logo_2 from "./../Assets/logo_2.png"

const serverUrl = "http://localhost"
const serverPort = 8080


export const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mail, setMail] = useState('')
  const [number, setNumber] = useState('')
  const [fullname, setFullname] = useState('John Doe')

  const [resp, setResp] = useState(0)

  function signupUser(e) {
    e.preventDefault();

    fetch(serverUrl + ":" + serverPort + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, mail, fullname, number }),
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        // data = {sucesss: bool, username: str}
        if (data.success) {
          window.location.replace("/login")
        } else {
          setResp(1)
        }
      });
  };


  return (
    <>
      <div class="logo-placeholder">
        <img src={logo_2} alt="Logo Placeholder" />
      </div>

      <div class="signup-container">
        <form class="signup-form" onSubmit={signupUser}>
          <h2>Create an Account</h2>
          <div class="input-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" value={mail} onChange={(e) => setMail(e.target.value)} required />
          </div>
          <div class="input-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={number} onChange={(e) => setNumber(e.target.value)} required />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {resp === 1 && <p>Username already exists.</p>}
          <button type="submit" class="signup-button">Sign Up</button>
          <p class="links">Already have an account? <a href="#">Login</a></p>
        </form>
      </div>
    </>
  )
}
