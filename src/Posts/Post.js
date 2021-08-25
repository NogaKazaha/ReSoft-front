import React, {useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import './Post.css';
import { Link, useHistory } from 'react-router-dom'
import Filters from './Filters';
import AllPosts from './AllPosts'
import Pagination from '../Pagination/Pagination'
import Cookies from 'js-cookie';
import Modal from '../Modal/Modal';

function Posts() {
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(4)
    const [modalActive, setModalActive] = useState(false)
    let [posts, setPosts] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch('http://127.0.0.1:8000/api/posts/show_all', {
        method:"GET",
        headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
        }
        })
        .then((response) => response.json())
        .then(data => setPosts(data))
        setLoading(false)
    },[])

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState("");
    const history = useHistory();

    async function createNewPost() {
        let item = {title, content, categories}
        console.warn(item)
        let result = await fetch("http://127.0.0.1:8000/api/posts/create" , {
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
        Cookies.set(`my_posts_${result.post.id}`, result.post.id)
        window.location.href = `/posts`
      }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

    function paginate(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
        <div className='posts-main-div'>
            <Helmet>
                <title>Posts &#8739; ReSoft</title>
            </Helmet>
            <div className='posts'>
                <div className='content'>
                    {
                        Cookies.get('token') != null && (
                        <div>
                            <span>No post for you?</span>
                            <button id='create-question' onClick={() => setModalActive(true)}>Create a question</button>
                        </div>
                        )
                    }
                    <Filters />
                    <AllPosts posts={currentPost} loading={loading}/>
                    <Pagination PerPage={postsPerPage} total={posts.length} paginate={paginate} />
                    <Modal active={modalActive} setActive={setModalActive}>
                        <div className="create-form">
                            <p>Create new post</p>
                            <input className="create-input" value={title} type="text" onChange={(e)=> setTitle(e.target.value)} placeholder="Title"></input>
                            <textarea className="create-input" rows="25" cols="300" value={content} type="text" onChange={(e)=> setContent(e.target.value)} placeholder="Content"></textarea>
                            <input className="create-input" value={categories} type="text" onChange={(e)=> setCategories(e.target.value)} placeholder="Categories"></input>
                            <button className="create-button" onClick={createNewPost}>Create</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Posts;
