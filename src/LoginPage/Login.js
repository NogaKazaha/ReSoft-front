import React from 'react';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './Login.css'

function Login() {
  return (
    <div className="login-main-div">
      <Helmet>
        <title>Log in &#8739; USOF</title>
      </Helmet>
      <div className="login-form">
        <h1>Log in</h1>
        <input className="login-input" placeholder="Username"></input>
        <input className="login-input" placeholder="Password"></input>
        <button className="login-button">Log in</button>
        <span className="redirect-to-register">Don't have account? <Link to="/register">Sign up</Link></span>
        <span className="redirect-to-register">Forgot password? <Link to="/password_remind">Remind password</Link></span>
      </div>
    </div>
  )
}

export default Login;