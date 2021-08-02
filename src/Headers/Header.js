import React from 'react';
import './Header.css';
import logo from '../assets/logo-full.svg';
import { Link } from 'react-router-dom'
function Header() {
    return (
        <div className='header-main-div'>
            <div className='header'>
                <div className='logo'><img src={logo} alt='logo' />
                    <label><Link to="/">USOF</Link></label>
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
                    <Link to="/help">Help</Link>
                </div>
                <div className='user'>
                    <Link to="/login">Log in</Link>
                    <svg viewBox="0 0 34 34" fill="#F2F0FE" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="17" cy="17" r="17" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Header;
