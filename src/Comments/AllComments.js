import React, {useEffect, useState, setState} from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
export default function AllComments({comments, loading, post_id}) {
  let [type] = useState("");
    async function putLIke(comment_id) {
        type = "like"
        let item = {type}
        console.warn(item)
        let result = await fetch(`http://127.0.0.1:8000/api/comments/${comment_id}/like` , {
          method:"POST",
          body:JSON.stringify(item),
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json',
            "Authorization": 'Bearer' + Cookies.get('token')
          }
        })
        result = await result.json()
        Cookies.set(`liked_comment_${comment_id}`, comment_id)
        console.warn("result", result)
        window.location.href = `/comments/${post_id}`
    }
    async function putDislike(comment_id) {
        type = "dislike"
        let item = {type}
        console.warn(item)
        let result = await fetch(`http://127.0.0.1:8000/api/comments/${comment_id}/like` , {
          method:"POST",
          body:JSON.stringify(item),
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json',
            "Authorization": 'Bearer' + Cookies.get('token')
          }
        })
        result = await result.json()
        Cookies.set(`liked_comment_${comment_id}`, comment_id)
        console.warn("result", result)
        window.location.href = `/comments/${post_id}`
    }
    async function deleteMyMark(comment_id) {
        let result = await fetch(`http://127.0.0.1:8000/api/comments/${comment_id}/like` , {
          method:"DELETE",
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json',
            "Authorization": 'Bearer' + Cookies.get('token')
          }
        })
        result = await result.json()
        Cookies.remove(`liked_comment_${comment_id}`)
        console.warn("result", result)
        window.location.href = `/comments/${post_id}`
    }
    async function delComment(comment_id) {
      let result = await fetch(`http://127.0.0.1:8000/api/comments/delete/${comment_id}` , {
        method:"DELETE",
        headers:{
          "Content-Type":'application/json',
          "Accept":'application/json',
          "Authorization": 'Bearer' + Cookies.get('token')
        }
      })
      result = await result.json()
      Cookies.remove(`my_comments_${comment_id}`, comment_id)
      console.warn("result", result)
      window.location.href = `/comments/${post_id}`
  }
    return (
        <div className='all-comments-div'>
          {
            comments.map((comments, index) =>{
              return (
                <div className='comment'>
                  <div className="avatar-div">
                    <img id="avatar" key={index} src={'http://localhost:8000/' + comments.avatar} />
                  </div>
                    <Link to={comments.user_id == Cookies.get('my_id') ? '/me' : '/users/' + comments.user_id }><h1 id="comment-author">{comments.username}</h1></Link>
                    <span id="comment-content">{comments.content}</span>
                    <span id="comment-content">Rating: {comments.rating}</span>
                    <div class="dropdown">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" className="dropbtn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                        </svg>
                                    </Dropdown.Toggle>
                                    {
                                        Cookies.get('token') != null && (
                                            Cookies.get(`liked_comment_${comments.id}`) != comments.id && (
                                                <Dropdown.Menu className="dropdown-content">
                                                    <Dropdown.Item onClick={() => putLIke(comments.id)} >Put like</Dropdown.Item>
                                                    <Dropdown.Item onClick={() =>putDislike(comments.id)}>Put dislike</Dropdown.Item>
                                                    {
                                                        Cookies.get(`my_comments_${comments.id}`) == comments.id && (
                                                                <Dropdown.Item href={`/comments/update/${comments.id}`}>Update comment</Dropdown.Item>
                                                        )
                                                    }
                                                    {
                                                        Cookies.get(`my_comments_${comments.id}`) == comments.id && (
                                                          <Dropdown.Item onClick={() => delComment(comments.id)}>Delete post</Dropdown.Item>
                                                        )
                                                    }
                                                </Dropdown.Menu>
                                                )
                                                ||
                                                (
                                                    <Dropdown.Menu className="dropdown-content">
                                                        <Dropdown.Item onClick={() => deleteMyMark(comments.id)}>Delete my mark</Dropdown.Item>
                                                        {
                                                          Cookies.get(`my_comments_${comments.id}`) == comments.id && (
                                                                <Dropdown.Item href={`/comments/update/${comments.id}`}>Update comment</Dropdown.Item>
                                                        )
                                                        }
                                                        {
                                                          Cookies.get(`my_comments_${comments.id}`) == comments.id &&(
                                                          <Dropdown.Item onClick={() => delComment(comments.id)}>Delete post</Dropdown.Item>
                                                        )
                                                        }  
                                                    </Dropdown.Menu>
                                                )
                                        
                                        ) 
                                    }
                                </Dropdown>
                            </div>
                </div>
              )
            })
          }
            
        </div>
    )
}