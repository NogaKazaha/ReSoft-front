import React from 'react';
import './Post.css';
export default function Filters() {
    return (
        <div className='filters'>
            <div>
                <span>Sort by:&nbsp;</span>
                <select id='filter-by'>
                    <option>Newest</option>
                    <option>Active</option>
                    <option>Closed</option>
                    <option>Top</option>
                </select>
            </div>
            <div>
                <button id='create-question'>Search</button>
            </div>
        </div>
    )
}
