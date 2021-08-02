import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './PasswordRemind.css'

function RemindPass() {
  const [email, setEmail] = useState("");

  async function remindPass() {
    let item = {email}
    console.warn(item)
    let result = await fetch("http://127.0.0.1:8000/api/auth/reset_password", {
      method:"POST",
      body:JSON.stringify(item),
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      }
    })
    result = await result.json()
    console.warn("result", result)
  }
  return (
    <div className="reminder-main-div">
      <Helmet>
        <title>Remind password &#8739; ReSoft</title>
      </Helmet>
      <div className="reminder-form">
        <h1>Remind password</h1>
        <input className="reminder-input" value={email} type="text" onChange={(e)=> setEmail(e.target.value)} placeholder="Email"></input>
        <button className="reminder-button" onClick={remindPass}>Remind</button>
        <span className="redirect-to-register"><Link to="/login">Back to login</Link></span>
      </div>
    </div>
  )
}

export default RemindPass;