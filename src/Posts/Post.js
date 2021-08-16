import React from 'react';
import { Helmet } from 'react-helmet'
import './Post.css';
import Filters from './Filters';
import AllPosts from './AllPosts'

function Posts() {
    return (
        <div className='posts-main-div'>
            <Helmet>
                <title>Posts &#8739; ReSoft</title>
            </Helmet>
            <div className='posts'>
                <div className='content'>
                    <div>
                        <span>No post for you?</span>
                        <button id='create-question'>Create a question</button>
                    </div>
                    <Filters />
                    <AllPosts />
                </div>
            </div>
        </div>
    );
}

export default Posts;
