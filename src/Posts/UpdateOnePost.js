import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './OnePost.css'
import Cookies from 'js-cookie';

export default class UpdateOnePost extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        post: [],
        title: "",
        content: "",
        categories: "",
        post_id: props.match.params.id,
    }
  }
  async componentDidMount() {
    const res = await axios.get(`http://127.0.0.1:8000/api/posts/show/` + this.state.post_id)
      const post = res.data;
      this.setState({ post });
  }
  async setTitle(data) {
      const title = data;
      this.setState({ title })
  }
  async setContent(data) {
    const content = data;
    this.setState({ content })
}
async setCategories(data) {
    const categories = data;
    this.setState({ categories })
}

async update(title, content, categories) {
    let item = {title, content, categories}
    if(title == "") {
      title = this.state.post.title
      delete item.title
    }
    if(content == "") {
      content = this.state.post.content
      delete item.content
    }
    if(categories == "") {
      categories = this.state.post.categories
      delete item.categories
    }
    console.warn(item)
    let result = await fetch(`http://127.0.0.1:8000/api/posts/update/${this.state.post_id}`, {
      method:"PATCH",
      body:JSON.stringify(item),
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json',
        "Authorization": 'Bearer' + Cookies.get('token')
      }
    })
    result = await result.json()
    window.location.href = `/posts/${this.state.post_id}`
  }
  render() 
  { 

    return (
        <div className="update-post-main-div">
            <div className="posts-div">
                <div className="content">
                    <div className='post-div'>
                        <div className='one-post'>
                            <h1 id="post-title">Title: {this.state.post.title}</h1>
                            <span id="post-description">Content: {this.state.post.content}</span>
                            <span id="post-categories-div">Categories: {this.state.post.categories}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="update-posts-form">
                <h1>Update your post</h1>
                <textarea className="update-posts-input" value={this.state.title} type="text" onChange={(e)=> this.setTitle(e.target.value)} placeholder="Title"></textarea>
                <textarea value={this.state.content} rows="25" cols="300" className="update-posts-input" onChange={(e)=> this.setContent(e.target.value)} type="text"  placeholder="Content"></textarea>
                <textarea className="update-posts-input" value={this.state.categories} type="text" onChange={(e)=> this.setCategories(e.target.value)} placeholder="Categories"></textarea>
                <button className="update-post-button" onClick={() => this.update(this.state.title, this.state.content, this.state.categories)}>Update</button>
            </div>
        </div>
        
    )
  }
}