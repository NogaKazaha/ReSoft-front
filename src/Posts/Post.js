import React, {useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import './Post.css';
import { Link, useHistory, useLocation } from 'react-router-dom'
import AllPosts from './AllPosts'
import Pagination from '../Pagination/Pagination'
import Cookies, { set } from 'js-cookie';
import Modal from '../Modal/Modal';

function Posts() {
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(4)
    const [modalActive, setModalActive] = useState(false)
    const [query] = useState(new URLSearchParams(useLocation().search))
    const [sort_by, setSort] = useState(query.get('sort_by'))
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState("");
    if(sort_by == null) {
        setSort("")
    }
    const [order_by, setOrder] = useState(query.get('order_by'))
    if(order_by == null) {
        setOrder("")
    }
    const [status, setStatus] = useState(query.get('status'))
    let [posts, setPosts] = useState([])
    let item = {sort_by, order_by, status}
    if(status == null) {
        setStatus("")
        delete item.status
    }
    useEffect(() => { 
        setLoading(true)
        fetch('http://127.0.0.1:8000/api/posts/show_all', {
        method:"POST",
        body: JSON.stringify(item),
        headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
        }
        })
        .then((response) => response.json())
        .then(data => {
            setPosts(Object.values(data[0]))
        })
        setLoading(false)
    },[])

    async function createNewPost() {
        let item = {title, content, categories}
        console.warn(item)
        let result = await fetch("http://127.0.0.1:8000/api/posts/create" , {
          method:"POST",
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
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

    function paginate(pageNumber) {
        setCurrentPage(pageNumber)
    }
    let history = useHistory()
    function change() {
        let x = document.getElementById('filter-by').value
        let url
        if(x == 'top') {
            url = '/posts?sort_by=rating&order_by=desc'
        }
        else if(x == 'bottom') {
            url = '/posts?sort_by=rating&order_by=asc'
        }
        else if(x == 'new') {
            url = '/posts?sort_by=data&order_by=desc'
        }
        else if(x == 'old') {
            url = '/posts?sort_by=data&order_by=asc'
        }
        else if(x == 'active') {
            url = '/posts?sort_by=status&status=active'
        }
        else if(x == 'closed') {
            url = '/posts?sort_by=status&status=inactive'
        }
        window.location.href = url
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
                    <div className='filters'>
                        <div>
                            <span>Sort by:&nbsp;</span>
                            <select id='filter-by' onChange={() => change()}>
                                <option value='none'>None</option>
                                <option value='top'>Top rated</option>
                                <option value='bottom'>Most disliked</option>
                                <option value='new'>Newest</option>
                                <option value='old'>Oldest</option>
                                <option value='active'>Active</option>
                                <option value='closed'>Closed</option>
                            </select>
                        </div>
                    </div>
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
