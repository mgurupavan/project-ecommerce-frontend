import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
import MonthlyTotalCart from "./MonthlyTotalCart";
import MonthlyQuantity from "./MonthlyQuantity";
class MonthlyCarts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carts: [],
      cart: false
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
        //console.log(response.data);
        this.setState(() => ({
          carts: response.data.monthlyCart,
          cart: true
        }));
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit = (data, id) => {
    axios
      .put(`/monthlycarts/${id}`, data, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        this.state.carts.forEach(cartId => {
          if (cartId._id === id) {
            return (cartId.quantity = data.quantity);
          } else {
            return "";
          }
        });
        this.setState(() => ({ carts: this.state.carts }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (localStorage.getItem("token")) {
      if (this.state.carts[0]) {
        return (
          <div>
            <h4>
              Shopping Cart-{this.state.carts.length}
              <span
                style={{
                  float: "right",
                  fontSize: "15px",
                  fontWeight: "normal"
                }}
              >
                Quantity
              </span>
            </h4>
            {this.state.cart && (
              <div>
                {this.state.carts.map(cart => {
                  return (
                    <div key={cart._id}>
                      <hr />
                      <MonthlyQuantity
                        id={cart._id}
                        defaultValue={cart.quantity}
                        handleSubmit={this.handleSubmit}
                      />

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
                      <p>&#x20B9; {cart.product.price}</p>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        // eslint-disable-next-line no-script-url
                        href="javascript:void(0)"
                        target="_self"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "underline",
                          color: "red"
                        }}
                        onClick={() => {
                          axios
                            .delete(`/monthlycarts/${cart._id}`, {
                              headers: {
                                "x-auth": localStorage.getItem("token")
                              }
                            })
                            .then(response => {
                              let updateCart = this.state.carts.filter(
                                cartId => cartId._id !== cart._id
                              );
                              this.setState(() => ({
                                carts: updateCart
                              }));
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        Delete
                      </a>
                      <hr />
                    </div>
                  );
                })}
              </div>
            )}
            <MonthlyTotalCart carts={this.state.carts} />
            <div>
              <Link to="/user/select/addresses">
                <button>Proceed to Buy</button>
              </Link>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <h4>please add some products to the cart</h4>
            <Link to="/products">Products</Link>
          </div>
        );
      }
    } else {
      return <h2> please login to display the products</h2>;
    }
  }
}

export default MonthlyCarts;
