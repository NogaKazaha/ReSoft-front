import React, {useEffect, useState, setState} from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function AllComments({comments, loading}) {
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
                </div>
              )
            })
          }
            
        </div>
    )
}