import React, {useEffect, useState, setState} from 'react';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './MyProfile.css'
import Modal from '../Modal/Modal';

function MyProfile() {
    let [user, setUser] = useState([])
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/users/show/` + Cookies.get('my_id'), {
        method:"GET",
        headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
        }
        })
        .then((response) => response.json())
        .then(data => setUser(data))
    },[])
    const [modalActive, setModalActive] = useState(false)
    async function deleteUser() {
      let result = await fetch(`http://127.0.0.1:8000/api/users/delete/${Cookies.get('my_id')}`, {
        method:"DELETE",
        headers:{
          "Content-Type":'application/json',
          "Accept":'application/json',
          "Authorization": 'Bearer' + Cookies.get('token')
        }
      })
      result = await result.json()
      console.warn(result)
      Cookies.remove('token');
      Cookies.remove('my_id')
      window.location.href = `/`
    }
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
            <Link onClick={() => setModalActive(true)}>Delete my profile</Link>
          </div>
          <Modal active={modalActive} setActive={setModalActive}>
            <p className='warning'>Are you sure that you want to delete your profile. You will lose access to your account</p>
            <button onClick={deleteUser}>Delete my profile</button>
          </Modal>
      </div>
    </div>
  )
}


export function UpdateMyProfile() {
  let [user, setUser] = useState([])
  let [username, setUsername] = useState("");
  let [name , setName] = useState("");
  let [email , setEmail] = useState("");
  let [avatar , setAvatar] = useState("");
  const history = useHistory();
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/users/show/` + Cookies.get('my_id'), {
        method:"GET",
        headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
        }
        })
        .then((response) => response.json())
        .then(data => setUser(data))
    },[])
    async function updateAvatar() {
      const formData = new FormData()
      formData.append("avatar", avatar)
      let result = await fetch('http://127.0.0.1:8000/api/users/upload_avatar', {
        method:"POST",
        body: formData,
        headers:{
          "Content-Type":'multipart/form-data',
          "Accept":'application/json',
          "Authorization": 'Bearer' + Cookies.get('token')
        }
      })
      result = await result.json()
      // history.push('/me')
    }
    async function update() {
      let item = {username, name, email}
      if(username == "") {
        username = user.username
        delete item.username
      }
      if(name == "") {
        name = user.name
        delete item.name
      }
      if(email == "") {
        email = user.email
        delete item.email
      }
      
      console.warn(item)
      let result = await fetch(`http://127.0.0.1:8000/api/users/update/${Cookies.get('my_id')}`, {
        method:"PATCH",
        body:JSON.stringify(item),
        headers:{
          "Content-Type":'application/json',
          "Accept":'application/json',
          "Authorization": 'Bearer' + Cookies.get('token')
        }
      })
      result = await result.json()
      history.push('/me')
      
    }
    return (
      <div className="update-profile-main-div">
        <Helmet>
          <title>Update Profile &#8739; USOF</title>
        </Helmet>
        <div className="update-profile-form-div">
          <div className="my-profile-avatar-div">
            <img className="avatar" src={'http://localhost:8000/' + user.avatar}></img>
            <form encType="multipart/form-data">
              <input className="fileInput" type="file" value={avatar} accept="image/png,image/gif,image/jpeg, image/jpg" />
              <button className="submitButton" type="submit" onClick={updateAvatar}>Upload Image</button>
            </form>
          </div>
          <div className="user-form">
            <h1>Update your data</h1>
            <input className="user-input" value={username} type="text" onChange={(e)=> setUsername(e.target.value)} placeholder="Username"></input>
            <input className="user-input" value={name} type="text" onChange={(e)=> setName(e.target.value)} placeholder="Name"></input>
            <input className="user-input" value={email} type="text" onChange={(e)=> setEmail(e.target.value)} placeholder="Email"></input>
            <button className="update-button" onClick={update}>Update</button>
          </div>
        </div>
      </div>
    )
}

export default MyProfile;