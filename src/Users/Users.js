import React, {useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet'
import Pagination from '../Pagination/Pagination'

import AllUsers from './AllUsers';

function Users() {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(5)
  let [users, setUsers] = useState([])
  useEffect(() => {
    setLoading(true)
      fetch('http://127.0.0.1:8000/api/users/show_all', {
      method:"GET",
      headers:{
          "Content-Type":'application/json',
          "Accept":'application/json'
      }
      })
      .then((response) => response.json())
      .then(data => setUsers(data))
      setLoading(false)
  },[])
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUser = users.slice(indexOfFirstUser, indexOfLastUser)
  function paginate(pageNumber) {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="users-main-div">
      <Helmet>
        <title>Users &#8739; ReSoft</title>
      </Helmet>
      <div className="users">
        <div className="content">
          <AllUsers users={currentUser} loading={loading}/>
          <Pagination PerPage={usersPerPage} total={users.length} paginate={paginate} />
        </div>
      </div>
    </div>
  )
}

export default Users;