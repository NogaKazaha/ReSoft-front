import React, {useEffect, useState, setState} from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './Users.css';
export default function AllUsers({users, loading}) {
    return (
        <div className='all-users-div'>
            {
              users.map((users, index) =>{
                const url = "/users/" + users.id
                return (
                  <div className='user-info-div'>
                    <Link to={users.id == Cookies.get('my_id') ? '/me' : url}>
                      <div className="avatar-div">
                        <img id="avatar" key={index} src={'http://localhost:8000/' + users.avatar} />
                      </div>
                      <span id="username" key={index}>{users.username}</span>
                    </Link>
                  </div>
                );
              })
            }
        </div>
    )
}