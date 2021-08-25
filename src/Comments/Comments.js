import React, {useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import { useParams } from "react-router-dom";
import AllComments from './AllComments'
import Pagination from '../Pagination/Pagination'
import Cookies from 'js-cookie';
import './Comments.css'
import Modal from '../Modal/Modal';


function Comments() {
  let post_id = useParams()
  post_id = Object.values(post_id)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [commentsPerPage] = useState(3)
  const [modalActive, setModalActive] = useState(false)
  const [content, setContent] = useState("");
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
  },[])
  async function createNewComment() {
    let item = {content}
    console.warn(item)
    let result = await fetch(`http://127.0.0.1:8000/api/comments/${post_id[0]}/create` , {
      method:"POST",
      body:JSON.stringify(item),
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json',
        "Authorization": 'Bearer' + Cookies.get('token')
      }
    })
    result = await result.json()
    console.warn("result", result)
    Cookies.set(`my_comments_${result.comment.id}`, result.comment.id)
    window.location.href = `/comments/${post_id[0]}`
  }
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
            {
              Cookies.get('token') != null && (
                <div>
                  <button id='create-question' onClick={() => setModalActive(true)}>Create comment</button>
                </div>
              )
            }
            <AllComments comments={currentComment} authors={authors} post_id={post_id[0]}/>
            <Pagination PerPage={commentsPerPage} total={comments.length} paginate={paginate} />
              <Modal active={modalActive} setActive={setModalActive}>
                        <div className="create-form">
                            <p>Create new comment</p>
                            <textarea className="create-input" rows="25" cols="300" value={content} type="text" onChange={(e)=> setContent(e.target.value)} placeholder="Content"></textarea>
                            <button className="create-button" onClick={createNewComment}>Create</button>
                        </div>
                    </Modal>
        </div>
      </div>
    </div>
  )
}

export default Comments;