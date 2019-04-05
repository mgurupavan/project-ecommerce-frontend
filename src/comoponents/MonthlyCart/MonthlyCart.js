import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
class MonthlyCart extends Component {
  constructor() {
    super();
    this.state = {
      monthlycart: [],
      onload: false,
      quaninty: 1,
      totalCart: 0
    };
  }
  componentDidMount() {
    axios
      .get("/monthlycarts", {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState(() => ({
          monthlycart: response.data.monthlycart,
          onload: true
        }));
        //console.log(carts);
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleQuentity = e => {};

  handleDelete = () => {};

  render() {
    //console.log("guru");
    //  console.log(this.state.carts);
    if (localStorage.getItem("token")) {
      if (this.state.carts[0]) {
        return (
          <div>
            {/* {console.log(this.state.carts)} */}
            {console.log(this.state.carts, 1)}
            <h4>Shopping Cart-{this.state.carts.length}</h4>

            {this.state.cart && (
              <div>
                {this.state.carts.map(cart => {
                  return (
                    <div key={cart._id}>
                      <hr />
                      <form type={this.handleSubmit}>
                        <span
                          style={{
                            float: "left",
                            fontSize: "15px",
                            fontWeight: "normal"
                          }}
                        >
                          Quantity
                        </span>
                        <label>
                          <input
                            type="number"
                            name="quantity"
                            value={cart.quantity}
                            min="1"
                            max="50"
                            onChange={this.handleQuentity}
                            style={{ float: "right" }}
                          />
                        </label>
                      </form>
                      <h4>
                        <Link to={`/products/${cart.product._id}`}>
                          {cart.product.name}
                        </Link>
                      </h4>
                      <img
                        src={cart.product.imageUrl}
                        alt="productImg"
                        width="100"
                        hight="100"
                      />
                      <p>price -{cart.product.price}</p>
                      <button
                        style={{ textDecoration: "underline", color: "red" }}
                        onClick={() => {
                          axios
                            .delete(`carts/${cart._id}`, {
                              headers: {
                                "x-auth": localStorage.getItem("token")
                              }
                            })
                            .then(response => {
                              let updatedCart = this.state.carts.filter(
                                ucart => ucart._id !== cart._id
                              );

                              this.setState({ carts: updatedCart });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        Delete
                      </button>
                      <hr />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div>
            <h2>no products in the cart to display</h2>
          </div>
        );
      }
    } else {
      return <div> please login to get the cart value</div>;
    }
  }
}

export default MonthlyCart;
