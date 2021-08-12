import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Categories.css'

export default class OneCategory extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      categories: [],
      category_id: props.match.params.id
    }
  }
  async componentDidMount() {
    const res = await axios.get(`http://127.0.0.1:8000/api/categories/show/` + this.state.category_id)
      const categories = res.data;
      this.setState({ categories });
  }
  
  render() 
  { 
    return (
        <div className="categories-main-div">
            <div className="categories">
                <div className="content">
                    <div className='category'>
                        <h1 id="category-title">{this.state.categories.title}</h1>
                        <span id="category-description">{this.state.categories.description}</span>
                    </div>
                    <Link className='link' to="/categories">Back to categories</Link>
                </div>
            </div> 
        </div>
          
    )  
  }
}