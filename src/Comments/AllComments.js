import React from 'react';
export default function AllComments() {
    return (
        <div className='all-comments-div'>
            <div className='comment'>
              <div className='user-avatar'>
                <svg viewBox="0 0 34 34" fill="#F2F0FE" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="17" cy="17" r="17" />
                </svg>
              </div>
              <h1 id="comment-author">Osavich</h1>
              <span id="comment-content">What a cringe</span>
            </div>
        </div>
    )
}