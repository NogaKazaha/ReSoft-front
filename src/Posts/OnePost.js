import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './OnePost.css'
import Cookies from 'js-cookie';

export default class OnePost extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        user: [],
        post: [],
        post_id: props.match.params.id,
        type: ""
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
  async putLIke(post_id) {
    const type = "like" 
    this.setState({ type })
    let item = {type}
    console.warn(item)
    let result = await fetch(`http://127.0.0.1:8000/api/posts/${post_id}/like` , {
      method:"POST",
      body:JSON.stringify(item),
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json',
        "Authorization": 'Bearer' + Cookies.get('token')
      }
    })
    result = await result.json()
    Cookies.set(`liked_post_${post_id}`, post_id)
    console.warn("result", result)
    window.location.href = `/posts/${post_id}`
}
async putDislike(post_id) {
    const type = "dislike" 
    this.setState({ type })
    let item = {type}
    console.warn(item)
    let result = await fetch(`http://127.0.0.1:8000/api/posts/${post_id}/like` , {
      method:"POST",
      body:JSON.stringify(item),
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json',
        "Authorization": 'Bearer' + Cookies.get('token')
      }
    })
    result = await result.json()
    Cookies.set(`liked_post_${post_id}`, post_id)
    console.warn("result", result)
    window.location.href = `/posts/${post_id}`
}
async deleteMyMark(post_id) {
    let result = await fetch(`http://127.0.0.1:8000/api/posts/${post_id}/like` , {
      method:"DELETE",
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json',
        "Authorization": 'Bearer' + Cookies.get('token')
      }
    })
    result = await result.json()
    Cookies.remove(`liked_post_${post_id}`)
    console.warn("result", result)
    window.location.href = `/posts/${post_id}`
}
async addToSubs(post_id) {
    let result = await fetch(`http://127.0.0.1:8000/api/subscriptions/add/${post_id}` , {
      method:"POST",
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json',
        "Authorization": 'Bearer' + Cookies.get('token')
      }
    })
    result = await result.json()
    Cookies.set(`subs_${post_id}`, post_id)
    console.warn("result", result)
    window.location.href = `/posts/${post_id}`
}
async delFromSubs(post_id) {
    let result = await fetch(`http://127.0.0.1:8000/api/subscriptions/delete/${post_id}` , {
      method:"DELETE",
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json',
        "Authorization": 'Bearer' + Cookies.get('token')
      }
    })
    result = await result.json()
    Cookies.remove(`subs_${post_id}`, post_id)
    console.warn("result", result)
    window.location.href = `/posts/${post_id}`
}
async addToFavs(post_id) {
    let result = await fetch(`http://127.0.0.1:8000/api/favorites/add/${post_id}` , {
      method:"POST",
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json',
        "Authorization": 'Bearer' + Cookies.get('token')
      }
    })
    result = await result.json()
    Cookies.set(`favs_${post_id}`, post_id)
    console.warn("result", result)
    window.location.href = `/posts/${post_id}`
}
async delFromFavs(post_id) {
    let result = await fetch(`http://127.0.0.1:8000/api/favorites/delete/${post_id}` , {
      method:"DELETE",
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json',
        "Authorization": 'Bearer' + Cookies.get('token')
      }
    })
    result = await result.json()
    Cookies.remove(`favs_${post_id}`, post_id)
    console.warn("result", result)
    window.location.href = `/posts/${post_id}`
}
async delPost(post_id) {
  let result = await fetch(`http://127.0.0.1:8000/api/posts/delete/${post_id}` , {
    method:"DELETE",
    headers:{
      "Content-Type":'application/json',
      "Accept":'application/json',
      "Authorization": 'Bearer' + Cookies.get('token')
    }
  })
  result = await result.json()
  Cookies.remove(`my_posts_${post_id}`, post_id)
  console.warn("result", result)
  window.location.href = `/posts`
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
                            <Link to={this.state.post.user_id == Cookies.get('my_id') ? '/me' : '/users/' + this.state.post.user_id}><span id="post-creator-div">Author: {this.state.user.username}</span></Link>
                            <span id="post-categories-div">{this.state.post.categories}</span>
                            <div class="dropdown">
                            <Dropdown>
                                    <Dropdown.Toggle variant="success" className="dropbtn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                        </svg>
                                    </Dropdown.Toggle>
                                    {
                                        
                                        Cookies.get('token') != null && (
                                            Cookies.get(`liked_post_${this.state.post_id}`) != this.state.post_id && (
                                                <Dropdown.Menu className="dropdown-content">
                                                    <Dropdown.Item onClick={() => this.putLIke(this.state.post_id)}>Put like</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => this.putDislike(this.state.post_id)}>Put dislike</Dropdown.Item>
                                                    {
                                                        Cookies.get(`subs_${this.state.post_id}`) == this.state.post_id && (
                                                            <Dropdown.Item onClick={() => this.delFromSubs(this.state.post_id)}>Delete from subscriptions</Dropdown.Item>
                                                        )
                                                        ||
                                                        (
                                                            <Dropdown.Item onClick={() => this.addToSubs(this.state.post_id)}>Add to subscriptions</Dropdown.Item>
                                                        )
                                                    }
                                                    {
                                                        Cookies.get(`favs_${this.state.post_id}`) == this.state.post_id && (
                                                                <Dropdown.Item onClick={() => this.delFromFavs(this.state.post_id)}>Delete from favorites</Dropdown.Item>
                                                        )
                                                        ||
                                                        (
                                                            <Dropdown.Item onClick={() => this.addToFavs(this.state.post_id)}>Add to favorites</Dropdown.Item>
                                                        )
                                                    }
                                                    {
                                                        Cookies.get(`my_posts_${this.state.post_id}`) == this.state.post_id && (
                                                                <Dropdown.Item href={`/posts/update/${this.state.post_id}`}>Update post</Dropdown.Item>
                                                        )
                                                    }
                                                    {
                                                      Cookies.get(`my_posts_${this.state.post_id}`) == this.state.post_id && (
                                                          <Dropdown.Item onClick={() => this.delPost(this.state.post_id)}>Delete post</Dropdown.Item>
                                                        )
                                                    }
                                                    <Dropdown.Item href={"/comments/" + this.state.post_id}>Show comments</Dropdown.Item>
                                                </Dropdown.Menu>
                                                )
                                                ||
                                                (
                                                    <Dropdown.Menu className="dropdown-content">
                                                        <Dropdown.Item onClick={() => this.deleteMyMark(this.state.post_id)}>Delete my mark</Dropdown.Item>
                                                        {
                                                            Cookies.get(`subs_${this.state.post_id}`) == this.state.post_id && (
                                                                <Dropdown.Item onClick={() => this.delFromSubs(this.state.post_id)}>Delete to subscriptions</Dropdown.Item>
                                                            )
                                                            ||
                                                            (
                                                                <Dropdown.Item onClick={() => this.addToSubs(this.state.post_id)}>Add to subscriptions</Dropdown.Item>
                                                            )
                                                        }
                                                        {
                                                        Cookies.get(`favs_${this.state.post_id}`) == this.state.post_id && (
                                                                <Dropdown.Item onClick={() => this.delFromFavs(this.state.post_id)}>Delete from favorites</Dropdown.Item>
                                                        )
                                                        ||
                                                        (
                                                            <Dropdown.Item onClick={() => this.addToFavs(this.state.post_id)}>Add to favorites</Dropdown.Item>
                                                        )
                                                        }
                                                        {
                                                          Cookies.get(`my_posts_${this.state.post_id}`) == this.state.post_id && (
                                                                <Dropdown.Item href={`/posts/update/${this.state.post_id}`}>Update post</Dropdown.Item>
                                                        )
                                                        }
                                                        {
                                                          Cookies.get(`my_posts_${this.state.post_id}`) == this.state.post_id && (
                                                              <Dropdown.Item onClick={() => this.delPost(this.state.post_id)}>Delete post</Dropdown.Item>
                                                            )
                                                        }  
                                                        <Dropdown.Item href={"/comments/" + this.state.post_id}>Show comments</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                )
                                        
                                        ) 
                                        ||
                                        (
                                        <Dropdown.Menu className="dropdown-content">
                                            <Dropdown.Item href="/login">Log in first</Dropdown.Item>
                                        </Dropdown.Menu>
                                        )
                                    }
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