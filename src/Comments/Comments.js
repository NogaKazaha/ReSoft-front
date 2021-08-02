import React from 'react';
import { Helmet } from 'react-helmet'
import AllComments from './AllComments'
import './Comments.css'


function Comments() {
  return (
    <div className="comments-main-div">
      <Helmet>
        <title>Comments &#8739; ReSoft</title>
      </Helmet>
      <div className="comments">
        <div className="content">
            <AllComments />
        </div>
      </div>
    </div>
  )
}

export default Comments;