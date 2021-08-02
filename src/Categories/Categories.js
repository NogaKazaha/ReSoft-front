import React from 'react';
import { Helmet } from 'react-helmet'
import AllCategories from './AllCategories'


function Categories() {
  return (
    <div className="categories-main-div">
      <Helmet>
        <title>Categories &#8739; ReSoft</title>
      </Helmet>
      <div className="categories">
        <div className="content">
          <AllCategories />
        </div>
      </div>
    </div>
  )
}

export default Categories;