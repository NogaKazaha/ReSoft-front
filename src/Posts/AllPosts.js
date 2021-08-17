import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Post.css';
export default function AllPosts({posts, loading}) {
    return (
        <div className='all-posts-menu'>
            {
                posts.map((posts, index) =>{
                    const url = "/posts/" + posts.id
                    return (
                        <div className='post'>
                            <div class="dropdown">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" className="dropbtn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                        </svg>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-content">
                                        <Dropdown.Item href="#">Put like</Dropdown.Item>
                                        <Dropdown.Item href="#">Put dislike</Dropdown.Item>
                                        <Dropdown.Item href="#">Delete my mark</Dropdown.Item>
                                        <Dropdown.Item href="#">Add to subscriptions</Dropdown.Item>
                                        <Dropdown.Item href="#">Add to favorite</Dropdown.Item>
                                        <Dropdown.Item href="#">Delete to subscriptions</Dropdown.Item>
                                        <Dropdown.Item href="#">Delete to favorite</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div>
                                <Link to={url}>
                                    <h1 id="post-title">{posts.title}</h1>
                                    <span id="post-content">{posts.content}</span>
                                    <div className='post-rating'>
                                        <span id="post-content">Rating: {posts.rating}</span>
                                    </div> 
                                    <div id="post-tags">
                                        <span id="post-tags-content">Categories: {posts.categories}</span>
                                    </div>
                                </Link>
                            </div> 
                        </div>
                    )
                })
            }
        </div>
            
    )
}
