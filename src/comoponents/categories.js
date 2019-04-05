import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../config/config";
class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  componentDidMount() {
    axios.get("/categories").then(response => {
      const categories = response.data;
      this.setState(() => ({ categories: categories }));
    });
  }
  render() {
    return (
      <div>
        {/* <h5> Categories - {this.state.categories.length}</h5> */}
        <h4>Please select a category</h4>
        <ul>
          {this.state.categories.map(category => {
            return (
              <li key={category._id}>
                <Link to={`/categories/${category._id}`}>{category.name}</Link>
              </li>
            );
          })}
        </ul>
        <Link to="category/add">Add Category</Link>
      </div>
    );
  }
}

export default Categories;
