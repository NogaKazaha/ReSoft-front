import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './OnePost.css'

export default class OnePost extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        user: [],
        post: [],
        post_id: props.match.params.id
    }
  }
  async componentDidMount() {
    const res = await axios.get(`http://127.0.0.1:8000/api/posts/show/` + this.state.post_id)
      const post = res.data;
      this.setState({ post });
    const res1 = await axios.get(`http://127.0.0.1:8000/api/users/show/` + this.state.post.user_id)
      const user = res1.data;
      this.setState({ user });
  }
  
  render() 
  { 
    return (
        <div className="post-main-div">
            <div className="posts-div">
                <div className="content">
                    <div className='post-div'>
                        <div className='one-post'>
                            <h1 id="post-title">{this.state.post.title}</h1>
                            <span id="post-description">{this.state.post.content}</span>
                            <span id="post-rating-div">Rating: {this.state.post.rating}</span>
                            <Link to={'/users/' + this.state.post.user_id}><span id="post-creator-div">Author: {this.state.user.username}</span></Link>
                            <div class="dropdown">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" className="dropbtn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                            </svg>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-content">
                                            <Dropdown.Item href="#">Put like</Dropdown.Item>
                                            <Dropdown.Item href="#">Put dislike</Dropdown.Item>
                                            <Dropdown.Item href="#">Delete my mark</Dropdown.Item>
                                            <Dropdown.Item href="#">Add to subscriptions</Dropdown.Item>
                                            <Dropdown.Item href="#">Add to favorite</Dropdown.Item>
                                            <Dropdown.Item href="#">Delete to subscriptions</Dropdown.Item>
                                            <Dropdown.Item href="#">Delete to favorite</Dropdown.Item>
                                            <Dropdown.Item href="#">Show comments</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                            </div>
                        </div>
                        
                    </div>
                    <Link className='link' to="/posts">Back to posts</Link>
                </div>
            </div> 
        </div>
          
    )  
  }
}