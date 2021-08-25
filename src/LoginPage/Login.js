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
    if(result.status != 200) {
      console.error('Login error. Http request status:', result.status)
    }
    else {
      result = await result.json()
      let liked_posts = await fetch(`http://127.0.0.1:8000/api/posts/show/${result.user_id}/like`, {
      method:"GET",
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      }
      })
      let liked_comments = await fetch(`http://127.0.0.1:8000/api/comments/show/${result.user_id}/like`, {
      method:"GET",
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      }
      })
      let subs = await fetch(`http://127.0.0.1:8000/api/subscriptions/show/${result.user_id}/ids`, {
      method:"GET",
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      }
      })
      let favs = await fetch(`http://127.0.0.1:8000/api/favorites/show/${result.user_id}/ids`, {
      method:"GET",
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      }
      })
      let my_posts = await fetch(`http://127.0.0.1:8000/api/posts/show/${result.user_id}/ids`, {
      method:"GET",
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      }
      })
      let my_comments = await fetch(`http://127.0.0.1:8000/api/comments/show/${result.user_id}/user`, {
      method:"GET",
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      }
      })
      
      
      liked_posts = await liked_posts.json()
      liked_comments = await liked_comments.json()
      subs = await subs.json()
      favs = await favs.json()
      my_posts = await my_posts.json()
      my_comments = await my_comments.json()
      for(let i = 1; i <= liked_posts.length; i++) {
        Cookies.set(`liked_post_${liked_posts[i - 1]}`, liked_posts[i - 1]);
      }
      for(let i = 1; i <= liked_comments.length; i++) {
        Cookies.set(`liked_comment_${liked_comments[i - 1]}`, liked_comments[i - 1]);
      }
      for(let i = 1; i <= subs.length; i++) {
        Cookies.set(`subs_${subs[i - 1]}`, subs[i - 1]);
      }
      for(let i = 1; i <= favs.length; i++) {
        Cookies.set(`favs_${favs[i - 1]}`, favs[i - 1]);
      }
      for(let i = 1; i <= my_posts.length; i++) {
        Cookies.set(`my_posts_${my_posts[i - 1]}`, my_posts[i - 1]);
      }
      for(let i = 1; i <= my_comments.length; i++) {
        Cookies.set(`my_comments_${my_comments[i - 1]}`, my_comments[i - 1]);
      }
      console.warn(result.token)
      Cookies.set('token', result.token);
      Cookies.set('my_id', result.user_id)
      window.location.href = `/me`
    }
  }

  return (
    <div className="login-main-div">
      <Helmet>
        <title>Log in &#8739; USOF</title>
      </Helmet>
      <div className="login-form">
        <h1>Log in</h1>
        <input className="login-input" value={username} type="text" onChange={(e)=> setUsername(e.target.value)} placeholder="Username"></input>
        <input className="login-input" value={password} type="password" onChange={(e)=> setPassword(e.target.value)} placeholder="Password"></input>
        <button className="login-button" onClick={logIn}>Log in</button>
        <span className="redirect-to-register">Don't have account? <Link to="/register">Sign up</Link></span>
        <span className="redirect-to-register">Forgot password? <Link to="/password_reset">Reset password</Link></span>
      </div>
    </div>
  )
}

export default Login;