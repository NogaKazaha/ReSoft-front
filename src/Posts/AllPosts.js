import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
export default function Popular() {
    return (
        <div className='all-posts-menu'>
            <div className='post'>
                <div>
                    <button id="dislike">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                    </button>
                </div>
                <div>
                    <h1 id="post-title">Binding a data modal to Livewire component</h1>
                    <span id="post-content">I'm confuse about this. How can I bind my Models to Livewire?</span>
                    <div id="post-tags">
                        <span id="post-tags-content">Tags</span>
                        <button>Laravel</button>
                        <button>PHP</button>
                    </div>
                    <div className="comments-div">
                        <Link to="/posts/id/comments">View comments</Link>
                    </div>
                </div> 
            </div>
        </div>
    )
}
