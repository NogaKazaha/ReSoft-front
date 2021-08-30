import React, {useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import './Post.css';
import { useLocation } from 'react-router-dom'
import AllPosts from './AllPosts'
import Pagination from '../Pagination/Pagination'

function UserSubs() {
    const [query, setQuery] = useState(new URLSearchParams(useLocation().search))
    const [search] = useState(query.get('id'))
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(4)
    let [posts, setPosts] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(`http://127.0.0.1:8000/api/subscriptions/show_all/${search}`, {
        method:"GET",
        headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
        }
        })
        .then((response) => response.json())
        .then(data => {
            setPosts(data)
        })
        setLoading(false)
    },[])
    console.warn(posts)

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

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
                    <AllPosts posts={currentPost} loading={loading}/>
                    <Pagination PerPage={postsPerPage} total={posts.length} paginate={paginate} />
                </div>
            </div>
        </div>
    );
}

export default UserSubs;