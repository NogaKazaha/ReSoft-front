import React, {useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import { useParams } from "react-router-dom";
import AllComments from './AllComments'
import Pagination from '../Pagination/Pagination'
import './Comments.css'


function Comments() {
  let post_id = useParams()
  post_id = Object.values(post_id)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [commentsPerPage] = useState(5)
  let [comments, setComments] = useState([])
  let [authors, setAuthors] = useState([])
  useEffect(() => {
    setLoading(true)
      fetch(`http://127.0.0.1:8000/api/comments/show/${post_id[0]}/post`, {
      method:"GET",
      headers:{
          "Content-Type":'application/json',
          "Accept":'application/json'
      }
      })
      .then((response) => response.json())
      .then(data => setComments(data))
      setLoading(false)
      fetch(`http://127.0.0.1:8000/api/comments/show/${post_id[0]}/post/authors`, {
      method:"GET",
      headers:{
          "Content-Type":'application/json',
          "Accept":'application/json'
      }
      })
      .then((response) => response.json())
      .then(data => setAuthors(data))
      setLoading(false)
  },[])
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComment = comments.slice(indexOfFirstComment, indexOfLastComment)

  function paginate(pageNumber) {
    setCurrentPage(pageNumber)
  }
  return (
    <div className="comments-main-div">
      <Helmet>
        <title>Comments &#8739; ReSoft</title>
      </Helmet>
      <div className="comments">
        <div className="content">
            <AllComments comments={currentComment} authors={authors}/>
            <Pagination PerPage={commentsPerPage} total={comments.length} paginate={paginate} />
        </div>
      </div>
    </div>
  )
}

export default Comments;