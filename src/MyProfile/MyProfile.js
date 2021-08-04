import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './MyProfile.css'

function MyProfile() {
    let [user, setUser] = useState([])
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/users/show/` + Cookies.get('user_id'), {
        method:"GET",
        headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
        }
        })
        .then((response) => response.json())
        .then(data => setUser(data))
    },[])

  return (
    <div className="login-main-div">
      <Helmet>
        <title>My Profile &#8739; USOF</title>
      </Helmet>
      <div className="my-profile-main-div">
          <div className="my-profile-avatar-div">
              <img className="avatar" src={'http://localhost:8000/' + user.avatar}></img>
          </div>
          <div className="my-profile-user-info">
              <span className="my-profile-span">Username: {user.username}</span>
              <span className="my-profile-span">Name: {user.name}</span>
              <span className="my-profile-span">Email: {user.email}</span>
              <span className="my-profile-span">Rating: {user.rating}</span>
              <span className="my-profile-span">Role: {user.role}</span>
          </div>
          <div className="my-profile-buttons">
            <Link to='/me/update'>Update my profile</Link>
            <Link to='/me/delete'>Delete my profile</Link>
          </div>
      </div>
    </div>
  )
}

export default MyProfile;