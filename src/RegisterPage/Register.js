import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { Link, useHistory} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './Register.css'

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
  const history = useHistory();

  async function signUp() {
    let item = {username, name, email, password}
    console.warn(item)
    let result = await fetch("http://127.0.0.1:8000/api/auth/register", {
      method:"POST",
      body:JSON.stringify(item),
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      }
    })
    result = await result.json()
    console.warn("result", result)
    history.push("/login")
  }

  return (
    <div className="register-main-div">
      <Helmet>
        <title>Register &#8739; USOF</title>
      </Helmet>
      <div className="register-form">
        <h1>Register</h1>
        <input className="register-input" value={username} type="text" onChange={(e)=> setUsername(e.target.value)} placeholder="Username"></input>
        <input className="register-input" value={name} type="text" onChange={(e)=> setName(e.target.value)} placeholder="Name"></input>
        <input className="register-input" value={email} type="text" onChange={(e)=> setEmail(e.target.value)} placeholder="Email"></input>
        <input className="register-input" value={password} type="text" onChange={(e)=> setPassword(e.target.value)} placeholder="Password"></input>
        <button className="register-button" onClick={signUp}>Sign up</button>
        <span className="redirect-to-login">Already have an account? <Link to="/login">Sign in</Link></span>
      </div>
    </div>
  )
}

export default Register;