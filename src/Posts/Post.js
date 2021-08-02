import React from 'react';
import { Helmet } from 'react-helmet'
import './Post.css';
import Filters from './Filters';
import Popular from './PopularCategories';
import AllPosts from './AllPosts'

function Posts() {
    return (
        <div className='posts-main-div'>
            <Helmet>
                <title>Posts &#8739; ReSoft</title>
            </Helmet>
            <div className='posts'>
                <div className='content'>
                    <Popular />
                    <Filters />
                    <AllPosts />
                </div>
            </div>
        </div>
    );
}

export default Posts;
