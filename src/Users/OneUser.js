import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Users.css'

export default class OneUser extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: [],
      user_id: props.match.params.id
    }
  }
  async componentDidMount() {
    const res = await axios.get(`http://127.0.0.1:8000/api/users/show/` + this.state.user_id)
      const user = res.data;
      this.setState({ user });
  }
  
  render() 
  { 
    return (
        <div className="my-profile-main-div">
          <div className="my-profile-avatar-div">
              <img className="avatar" src={'http://localhost:8000/' + this.state.user.avatar}></img>
          </div>
          <div className="my-profile-user-info">
              <span className="my-profile-span">Username: {this.state.user.username}</span>
              <span className="my-profile-span">Name: {this.state.user.name}</span>
              <span className="my-profile-span">Email: {this.state.user.email}</span>
              <span className="my-profile-span">Rating: {this.state.user.rating}</span>
              <span className="my-profile-span">Role: {this.state.user.role}</span>
          </div>
          <Link to="/users">Back to users</Link>
        </div>
          
    )  
  }
}