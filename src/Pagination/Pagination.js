import React from 'react'
import './Pagination.css'

function Pagination({PerPage, total, paginate}) {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(total / PerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className='pagination'>
            {pageNumbers.map(number => (
                <li key={number} className='page-item'>
                    <a onClick={() => paginate(number)} className='page-link'>
                        {number}
                    </a>
                </li>
            ))}
        </nav>
    )
}
export default Pagination;