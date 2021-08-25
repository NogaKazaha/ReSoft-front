import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default class UpdateOneComment extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        comment: [],
        content: "",
        comment_id: props.match.params.id,
    }
  }
  async componentDidMount() {
    const res = await axios.get(`http://127.0.0.1:8000/api/comments/show/` + this.state.comment_id)
      const comment = res.data;
      this.setState({ comment });
  }
  async setContent(data) {
    const content = data;
    this.setState({ content })
}

async update(content) {
    let item = {content}
    if(content == "") {
      content = this.state.post.content
      delete item.content
    }
    console.warn(item)
    let result = await fetch(`http://127.0.0.1:8000/api/comments/update/${this.state.comment_id}`, {
      method:"PATCH",
      body:JSON.stringify(item),
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json',
        "Authorization": 'Bearer' + Cookies.get('token')
      }
    })
    result = await result.json()
    window.location.href = `/comments/${this.state.comment.post_id}`
  }
  render() 
  { 

    return (
        <div className="update-post-main-div">
            <div className="posts-div">
                <div className="content">
                    <div className='post-div'>
                        <div className='one-post'>
                            <span id="post-description">Content: {this.state.comment.content}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="update-posts-form">
                <h1>Update your comment</h1>
                <textarea value={this.state.content} rows="25" cols="300" className="update-posts-input" onChange={(e)=> this.setContent(e.target.value)} type="text"  placeholder="Content"></textarea>
                <button className="update-post-button" onClick={() => this.update(this.state.content)}>Update</button>
            </div>
        </div>
        
    )
  }
}