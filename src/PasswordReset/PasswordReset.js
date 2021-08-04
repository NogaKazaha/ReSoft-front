import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './PasswordReset.css'

function PasswordReset() {
  const [email, setEmail] = useState("");
  const history = useHistory();

  async function resetPass() {
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
    Cookies.set('reset_token', result.reset_token);
    console.warn("result", result)
    history.push('/login')
  }
  return (
    <div className="reminder-main-div">
      <Helmet>
        <title>Reset password &#8739; ReSoft</title>
      </Helmet>
      <div className="reminder-form">
        <h1>Remind password</h1>
        <input className="reminder-input" value={email} type="text" onChange={(e)=> setEmail(e.target.value)} placeholder="Email"></input>
        <button className="reminder-button" onClick={resetPass}>Remind</button>
        <span className="redirect-to-register"><Link to="/login">Back to login</Link></span>
      </div>
    </div>
  )
}

export function ForgotPassword() {
  const [password, setPassword] = useState("");
  const history = useHistory();
  async function forgotPass() {
    let item = {password}
    console.warn(item)
    let result = await fetch(`http://127.0.0.1:8000/api/auth/reset_password/${Cookies.get('reset_token')}`, {
      method:"POST",
      body:JSON.stringify(item),
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      }
    })
    result = await result.json()
    Cookies.remove('reset_token');
    console.warn("result", result)
    history.push('/login')
  }
  return (
    <div className="reminder-main-div">
      <Helmet>
        <title>Forgot password &#8739; ReSoft</title>
      </Helmet>
      <div className="reminder-form">
        <h1>Set new password</h1>
        <input className="reminder-input" value={password} type="text" onChange={(e)=> setPassword(e.target.value)} placeholder="New password"></input>
        <button className="reminder-button" onClick={forgotPass}>Change password</button>
        <span className="redirect-to-register"><Link to="/login">Back to login</Link></span>
      </div>
    </div>
  )
}

export default PasswordReset;