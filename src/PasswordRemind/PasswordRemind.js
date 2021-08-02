import React from 'react';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './PasswordRemind.css'

function RemindPass() {
  return (
    <div className="reminder-main-div">
      <Helmet>
        <title>Remind password &#8739; USOF</title>
      </Helmet>
      <div className="reminder-form">
        <h1>Remind password</h1>
        <input className="reminder-input" placeholder="Email"></input>
        <button className="reminder-button">Remind</button>
        <span className="redirect-to-register"><Link to="/login">Back to login</Link></span>
      </div>
    </div>
  )
}

export default RemindPass;