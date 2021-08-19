import React, {useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import './Post.css';
import Filters from './Filters';
import AllPosts from './AllPosts'
import Pagination from '../Pagination/Pagination'
import Cookies from 'js-cookie';

function Posts() {
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(4)
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
                            <button id='create-question'>Create a question</button>
                        </div>
                        )
                    }
                    <Filters />
                    <AllPosts posts={currentPost} loading={loading}/>
                    <Pagination PerPage={postsPerPage} total={posts.length} paginate={paginate} />
                </div>
            </div>
        </div>
    );
}

export default Posts;
