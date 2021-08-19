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
                  <div className='user-avatar'>
                    <svg viewBox="0 0 34 34" fill="#F2F0FE" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="17" cy="17" r="17" />
                    </svg>
                  </div>
                    <h1 id="comment-author">{}</h1>
                    <span id="comment-content">{comments.content}</span>
                    <span id="comment-content">Rating: {comments.rating}</span>
                </div>
              )
            })
          }
            
        </div>
    )
}