import React, {useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie';
import './Post.css';
import Modal from '../Modal/Modal';
export default function AllPosts({posts, loading}) {
    let [type] = useState("");
    async function putLIke(post_id) {
        type = "like"
        let item = {type}
        console.warn(item)
        let result = await fetch(`http://127.0.0.1:8000/api/posts/${post_id}/like` , {
          method:"POST",
          body:JSON.stringify(item),
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json',
            "Authorization": 'Bearer' + Cookies.get('token')
          }
        })
        result = await result.json()
        Cookies.set(`liked_post_${post_id}`, post_id)
        console.warn("result", result)
        window.location.href = `/posts`
    }
    async function putDislike(post_id) {
        type = "dislike"
        let item = {type}
        console.warn(item)
        let result = await fetch(`http://127.0.0.1:8000/api/posts/${post_id}/like` , {
          method:"POST",
          body:JSON.stringify(item),
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json',
            "Authorization": 'Bearer' + Cookies.get('token')
          }
        })
        result = await result.json()
        Cookies.set(`liked_post_${post_id}`, post_id)
        console.warn("result", result)
        window.location.href = `/posts`
    }
    async function deleteMyMark(post_id) {
        let result = await fetch(`http://127.0.0.1:8000/api/posts/${post_id}/like` , {
          method:"DELETE",
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json',
            "Authorization": 'Bearer' + Cookies.get('token')
          }
        })
        result = await result.json()
        Cookies.remove(`liked_post_${post_id}`)
        console.warn("result", result)
        window.location.href = `/posts`
    }
    async function addToSubs(post_id) {
        let result = await fetch(`http://127.0.0.1:8000/api/subscriptions/add/${post_id}` , {
          method:"POST",
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json',
            "Authorization": 'Bearer' + Cookies.get('token')
          }
        })
        result = await result.json()
        Cookies.set(`subs_${post_id}`, post_id)
        console.warn("result", result)
        window.location.href = `/posts`
    }
    async function delFromSubs(post_id) {
        let result = await fetch(`http://127.0.0.1:8000/api/subscriptions/delete/${post_id}` , {
          method:"DELETE",
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json',
            "Authorization": 'Bearer' + Cookies.get('token')
          }
        })
        result = await result.json()
        Cookies.remove(`subs_${post_id}`, post_id)
        console.warn("result", result)
        window.location.href = `/posts`
    }
    async function addToFavs(post_id) {
        let result = await fetch(`http://127.0.0.1:8000/api/favorites/add/${post_id}` , {
          method:"POST",
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json',
            "Authorization": 'Bearer' + Cookies.get('token')
          }
        })
        result = await result.json()
        Cookies.set(`favs_${post_id}`, post_id)
        console.warn("result", result)
        window.location.href = `/posts`
    }
    async function delFromFavs(post_id) {
        let result = await fetch(`http://127.0.0.1:8000/api/favorites/delete/${post_id}` , {
          method:"DELETE",
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json',
            "Authorization": 'Bearer' + Cookies.get('token')
          }
        })
        result = await result.json()
        Cookies.remove(`favs_${post_id}`, post_id)
        console.warn("result", result)
        window.location.href = `/posts`
    }
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");
    let [categories, setCategories] = useState("");
    const [modalActive, setModalActive] = useState(false)
    async function update(posts) {
        let item = {title, content, categories}
        if(title == "") {
          title = posts.title
          delete item.title
        }
        if(content == "") {
          content = posts.content
          delete item.content
        }
        if(categories == "") {
          categories = posts.categories
          delete item.categories
        }
        console.warn(item)
        let result = await fetch(`http://127.0.0.1:8000/api/posts/update/${posts.id}`, {
          method:"PATCH",
          body:JSON.stringify(item),
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json',
            "Authorization": 'Bearer' + Cookies.get('token')
          }
        })
        result = await result.json()
        window.location.href = `/posts`
        
      }
    return (
        <div className='all-posts-menu'>
            {
                posts.map((posts, index) =>{
                    const url = "/posts/" + posts.id
                    const comment_url = "/comments/" + posts.id
                    return (
                        <div className='post'>
                            <div class="dropdown">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" className="dropbtn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                        </svg>
                                    </Dropdown.Toggle>
                                    {
                                        Cookies.get('token') != null && (
                                            Cookies.get(`liked_post_${posts.id}`) != posts.id && (
                                                <Dropdown.Menu className="dropdown-content">
                                                    <Dropdown.Item onClick={() => putLIke(posts.id)} >Put like</Dropdown.Item>
                                                    <Dropdown.Item onClick={() =>putDislike(posts.id)}>Put dislike</Dropdown.Item>
                                                    {
                                                        Cookies.get(`subs_${posts.id}`) == posts.id && (
                                                            <Dropdown.Item onClick={() => delFromSubs(posts.id)}>Delete from subscriptions</Dropdown.Item>
                                                        )
                                                        ||
                                                        (
                                                            <Dropdown.Item onClick={() => addToSubs(posts.id)}>Add to subscriptions</Dropdown.Item>
                                                        )
                                                    }
                                                    {
                                                        Cookies.get(`favs_${posts.id}`) == posts.id && (
                                                                <Dropdown.Item onClick={() => delFromFavs(posts.id)}>Delete from favorites</Dropdown.Item>
                                                        )
                                                        ||
                                                        (
                                                            <Dropdown.Item onClick={() => addToFavs(posts.id)}>Add to favorites</Dropdown.Item>
                                                        )
                                                    }
                                                    {
                                                        Cookies.get(`my_posts_${posts.id}`) == posts.id && (
                                                                <Dropdown.Item  onClick={() => setModalActive(true)}>Update post</Dropdown.Item>
                                                        )
                                                    }
                                                    <Dropdown.Item href={comment_url}>Show comments</Dropdown.Item>
                                                </Dropdown.Menu>
                                                )
                                                ||
                                                (
                                                    <Dropdown.Menu className="dropdown-content">
                                                        <Dropdown.Item onClick={() => deleteMyMark(posts.id)}>Delete my mark</Dropdown.Item>
                                                        {
                                                            Cookies.get(`subs_${posts.id}`) == posts.id && (
                                                                <Dropdown.Item onClick={() => delFromSubs(posts.id)}>Delete from subscriptions</Dropdown.Item>
                                                            )
                                                            ||
                                                            (
                                                                <Dropdown.Item onClick={() => addToSubs(posts.id)}>Add to subscriptions</Dropdown.Item>
                                                            )
                                                        }
                                                        {
                                                        Cookies.get(`favs_${posts.id}`) == posts.id && (
                                                                <Dropdown.Item onClick={() => delFromFavs(posts.id)}>Delete from favorites</Dropdown.Item>
                                                        )
                                                        ||
                                                        (
                                                            <Dropdown.Item onClick={() => addToFavs(posts.id)}>Add to favorites</Dropdown.Item>
                                                        )
                                                        }
                                                        {
                                                        Cookies.get(`my_posts_${posts.id}`) == posts.id && (
                                                                <Dropdown.Item  onClick={() => setModalActive(true)}>Update post</Dropdown.Item>
                                                        )
                                                        }  
                                                        <Dropdown.Item href={comment_url}>Show comments</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                )
                                        
                                        ) 
                                        ||
                                        (
                                        <Dropdown.Menu className="dropdown-content">
                                            <Dropdown.Item href="/login">Log in first</Dropdown.Item>
                                        </Dropdown.Menu>
                                        )
                                    }
                                </Dropdown>
                            </div>
                            <div>
                                <Link to={url}>
                                    <h1 id="post-title">{posts.title}</h1>
                                    <span id="post-content">{posts.content}</span>
                                    <div className='post-rating'>
                                        <span id="post-content">Rating: {posts.rating}</span>
                                    </div> 
                                    <div id="post-tags">
                                        <span id="post-tags-content">Categories: {posts.categories}</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
            
    )
}
