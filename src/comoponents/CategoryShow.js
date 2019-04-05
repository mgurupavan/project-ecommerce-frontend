import React, { Component } from "react";
import axios from "../config/config";
import { Link } from "react-router-dom";
class CategoryShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      products: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/categories/${id}`).then(response => {
      this.setState(() => ({
        category: response.data.category,
        products: response.data.products
      }));
    });
  }
  handleDelete = () => {
    const confirm = window.confirm("Are You Sure");
    const id = this.props.match.params.id;
    if (confirm) {
      axios
        .delete(`categories/${id}`)
        .then(response => {
          this.props.history.push("/categories"); // this anthor way of redireact
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div>
        <h4>{this.state.category.name}</h4>
        {this.state.products.map(product => {
          return (
            <div border="1px solid" key={product._id}>
              <h5>
                <Link to={`/products/${product._id}`}>{product.name}</Link>{" "}
              </h5>
              <br />
              <img
                src={product.imageUrl}
                alt={product.name}
                width="100"
                hight="100"
              />
              <br />
              <p>price:{product.price}</p>
            </div>
          );
        })}
        <h6>category editing || delete</h6>
        <Link to={`/categories/edit/${this.props.match.params.id}`}>Edit</Link>
        {"   "}
        <button onClick={this.handleDelete}>Delete</button>
        {""}
        <br />
        <Link to="/categories">Back</Link>
      </div>
    );
  }
}

export default CategoryShow;
