import React, {useEffect, useState, setState} from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './Categories.css';
export default function AllCategories() {
    let [categories, setCategories] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/categories/show_all', {
        method:"GET",
        headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
        }
        })
        .then((response) => response.json())
        .then(data => setCategories(data))
    },[])
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
