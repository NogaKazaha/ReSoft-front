import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './Login.css'

function Login() {
  const [username, setUsername] = useState("");
  const [password , setPassword] = useState("");
  const history = useHistory();
  async function logIn() {
    let item = {username, password}
    console.warn(item)
    let result = await fetch("http://127.0.0.1:8000/api/auth/login", {
      method:"POST",
      body:JSON.stringify(item),
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      }
    })
    result = await result.json()
    console.warn(result.token)
    Cookies.set('token', result.token);
    Cookies.set('my_id', result.user_id)
    window.location.href = `/me`
  }

  return (
    <div className="login-main-div">
      <Helmet>
        <title>Log in &#8739; USOF</title>
      </Helmet>
      <div className="login-form">
        <h1>Log in</h1>
        <input className="login-input" value={username} type="text" onChange={(e)=> setUsername(e.target.value)} placeholder="Username"></input>
        <input className="login-input" value={password} type="text" onChange={(e)=> setPassword(e.target.value)} placeholder="Password"></input>
        <button className="login-button" onClick={logIn}>Log in</button>
        <span className="redirect-to-register">Don't have account? <Link to="/register">Sign up</Link></span>
        <span className="redirect-to-register">Forgot password? <Link to="/password_reset">Reset password</Link></span>
      </div>
    </div>
  )
}

export default Login;