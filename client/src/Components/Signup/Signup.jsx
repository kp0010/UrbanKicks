import React, { useState } from "react"

import "./Signup.css"

import logo_2 from "./../Assets/logo_2.png"

const serverUrl = "http://localhost"
const serverPort = 8080


export const Signup = () => {
  const [mail, setMail] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')

  const [resp, setResp] = useState(0)

  function signupUser(e) {
    e.preventDefault();

    fetch(serverUrl + ":" + serverPort + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail, number, password, fullname }),
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        // data = {sucesss: bool, mail: str}
        if (data.success) {
          window.location.replace("/login")
        } else {
          setResp(1)
        }
      });
  };


  return (
    <>
      <div className="Signup">
        <main>
          <div className="logo-placeholder">
            <img src={logo_2} alt="Logo Placeholder" />
          </div>

          <div className="signup-container">
            <form className="signup-form" onSubmit={signupUser}>
              <h2>Create an Account</h2>
              <div className="input-group">
                <label for="fullname">Name</label>
                <input type="text" id="fullname" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
              </div>
              <div className="input-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" value={mail} onChange={(e) => setMail(e.target.value)} required />
              </div>
              <div className="input-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={number} onChange={(e) => setNumber(e.target.value)} required />
              </div>
              <div className="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="signup-button">Sign Up</button>
              {resp === 1 && <p>Email or Phone Number already exists. Please Log In.</p>}
              <p className="links">Already have an account? <a href="/login">Login</a></p>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}
