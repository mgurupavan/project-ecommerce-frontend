import React, { Component } from "react";
import axios from "../../config/config";
import CategoryForm from "./CategoriesForm";
class CategoryEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      isLoad: false
    };
  }
  componentDidMount() {
    axios
      .get(`categories/${this.props.match.params.id}`)
      .then(response => {
        const category = response.data.category;
        this.setState(() => ({ category: category, isLoad: true }));
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleSubmit = formData => {
    axios
      .put(`categories/${this.state.category._id}`, formData)
      .then(response => {
        this.props.history.push("/categories");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        {this.state.isLoad && (
          <CategoryForm
            name={this.state.category.name}
            handleSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

export default CategoryEdit;
