import React, { Component } from "react";
import axios from "../../config/config";
//import Lightbox from "";
import { Link } from "react-router-dom";
class ProductShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      isLoaded: false
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/products/${id}`).then(response => {
      const product = response.data;

      this.setState(() => ({ product, isLoaded: true }));
    });
  }
  handleDelete = () => {
    const confirm = window.confirm("Are You Sure");
    const id = this.props.match.params.id;
    if (confirm) {
      axios
        .delete(`products/${id}`, {
          headers: {
            "x-auth": localStorage.getItem("token")
          }
        })
        .then(response => {
          this.props.history.push("/products"); // this anthor way of redireact
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  handleCart = () => {
    const data = {
      product: this.state.product._id,
      quantity: 1
    };
    axios
      .post(`/carts`, data, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleMonthlyCart = () => {
    const data = {
      product: this.state.product._id,
      quantity: 1
    };
    axios
      .post("/monthlycarts", data, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    // console.log(this.state.product);
    return (
      <div>
        {this.state.isLoaded && (
          <div>
            <div>
              <h5>{this.state.product.name}</h5>
              <img
                src={this.state.product.imageUrl}
                alt="productImg"
                width="100"
                hight="100"
              />
              <p>description:{this.state.product.description}</p>
              <p>price -{this.state.product.price}</p>
              <button onClick={this.handleCart}>AddCart</button>
              <button onClick={this.handleMonthlyCart}>
                {" "}
                Add to Monthly Cart
              </button>
              <span>
                {" "}
                if you want to place products automatically for every month then
                please add it to monthly cart
              </span>
            </div>
            <hr />
            <Link to={`/product/edit/${this.props.match.params.id}`}>Edit</Link>
            {"|"}
            <button onClick={this.handleDelete}>Delete</button>
            {"|"}
            {/* <Link to="/products">Back</Link> */}
          </div>
        )}
      </div>
    );
  }
}

export default ProductShow;
