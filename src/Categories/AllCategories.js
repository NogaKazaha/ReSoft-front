import React, {useEffect, useState, setState} from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './Categories.css';
export default function AllCategories({categories, loading}) {
    return (
        <div className='all-categories-div'>
            {
              categories.map((categories, index) =>{
                const url = "/categories/" + categories.id
                return (
                  <div className='category'>
                    <Link to={url}>
                      <h1 id="category-title" key={index}>{categories.title}</h1>
                      <span id="category-description" key={index}>{categories.description}</span>
                    </Link>
                  </div>
                );
              })
            }
        </div>
    )
}
