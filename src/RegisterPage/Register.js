import React from 'react';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './Register.css'

function Register() {
  return (
    <div className="register-main-div">
      <Helmet>
        <title>Register &#8739; USOF</title>
      </Helmet>
      <div className="register-form">
        <h1>Register</h1>
        <input className="register-input" placeholder="Username"></input>
        <input className="register-input" placeholder="Name"></input>
        <input className="register-input" placeholder="Email"></input>
        <input className="register-input" placeholder="Password"></input>
        <input className="register-input" placeholder="Confirm password"></input>
        <button className="register-button">Log in</button>
        <span className="redirect-to-login">Already have an account? <Link to="/login">Sign in</Link></span>
      </div>
    </div>
  )
}

export default Register;