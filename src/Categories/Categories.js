import React, {useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet'
import Pagination from '../Pagination/Pagination'

import AllCategories from './AllCategories';

function Categories() {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [categoriesPerPage] = useState(5)
  let [categories, setCategories] = useState([])
  useEffect(() => {
    setLoading(true)
      fetch('http://127.0.0.1:8000/api/categories/show_all', {
      method:"GET",
      headers:{
          "Content-Type":'application/json',
          "Accept":'application/json'
      }
      })
      .then((response) => response.json())
      .then(data => setCategories(data))
      setLoading(false)
  },[])
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategory = categories.slice(indexOfFirstCategory, indexOfLastCategory)

  function paginate(pageNumber) {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="categories-main-div">
      <Helmet>
        <title>Categories &#8739; ReSoft</title>
      </Helmet>
      <div className="categories">
        <div className="content">
          <AllCategories categories={currentCategory} loading={loading}/>
          <Pagination categoriesPerPage={categoriesPerPage} totalCategories={categories.length} paginate={paginate} />
        </div>
      </div>
    </div>
  )
}

export default Categories;