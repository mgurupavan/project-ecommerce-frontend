import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
class MonthlyCart extends Component {
  constructor() {
    super();
    this.state = {
      monthlycarts: [],
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
          monthlycarts: response.data.monthlyCart,
          onload: true
        }));
        //console.log(carts);
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleQuentity = () => {};
  render() {
    //console.log(this.state.monthlycarts);

    if (localStorage.getItem("token")) {
      if (this.state.monthlycarts[0]) {
        return (
          <div>
            {/* {console.log(this.state.carts)} */}
            {/* {console.log(this.state.carts, 1)} */}

            <h4>Shopping Cart-{this.state.monthlycarts.length}</h4>

            {this.state.monthlycarts && (
              <div>
                {this.state.monthlycarts.map(cart => {
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
                            .delete(`monthlycarts/${cart._id}`, {
                              headers: {
                                "x-auth": localStorage.getItem("token")
                              }
                            })
                            .then(response => {
                              let updatedCart = this.state.monthlycarts.filter(
                                ucart => ucart._id !== cart._id
                              );

                              this.setState({ monthlycarts: updatedCart });
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
            <h2>no products in the monthlycart to display</h2>
          </div>
        );
      }
    } else {
      return <div> please login to get the cart value</div>;
    }
  }
}

export default MonthlyCart;
