import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './Header.css';
import logo from '../assets/logo-full.svg';
import { Link } from 'react-router-dom'
function Header() {
    async function logOut() {
        const token = Cookies.get('token');
        let item = {token}
        console.warn(item)
        let result = await fetch("http://127.0.0.1:8000/api/auth/logout", {
          method:"POST",
          body:JSON.stringify(item),
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
          }
        })
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        result = await result.json()
        console.warn(result)
        window.location.href = "/"
      }
    return (
        <div className='header-main-div'>
            <div className='header'>
                <div className='logo'>
                    <label><Link to="/">ReSoft</Link></label>
                </div>
                <div className='search'>
                    <input type='text' placeholder='Search for titles, contents or tags...' />
                    <button>
                    <svg class="svg-icon search-icon" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7">
                        <title id="title">Search Icon</title><desc id="desc">A magnifying glass icon.</desc><g class="search-path" fill="none" stroke="#848F91">
                            <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4"/>
                            <circle cx="8" cy="8" r="7"/></g></svg>
                    </button>
                </div>
                <div className="help">
                    <Link to="/posts">Posts</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/users">Users</Link>
                    {
                        Cookies.get('token') != null && (
                            <Link to='/me'>My profile</Link>
                        )
                    }
                </div>
                <div className='user'>
                    {Cookies.get('token') == null &&
                    (<Link to={"/login"}>
                        Log In
                    </Link>)
                    ||
                    (<Link to={"/"} onClick={logOut}>
                        Logout
                    </Link>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;
