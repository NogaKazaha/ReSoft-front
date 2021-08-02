import React from 'react';
import './Post.css';
export default function Filters() {
    return (
        <div className='filters'>
            <div>
                <span>No post for you?</span>
                <button id='create-question'>Create a question</button>
            </div>
            <div>
                <span>Sort by:&nbsp;</span>
                <select id='filter-by'>
                    <option>Newest</option>
                    <option>Active</option>
                    <option>Closed</option>
                    <option>Top</option>
                </select>
            </div>
        </div>
    )
}
