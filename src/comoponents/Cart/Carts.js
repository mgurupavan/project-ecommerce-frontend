import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
import TotalCart from "./TotalCart";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carts: [],
      cart: false,
      quantity: Number,
      cartId: ""
    };
  }
  componentDidMount() {
    axios
      .get("/carts", {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data.cart);
        this.setState(() => ({ carts: response.data.cart, cart: true }));
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleQuantity = e => {
    e.persist();
    // console.log(e.target.value);
    const id = e.target.id;
    this.setState(() => ({ quantity: e.target.value, cartId: id }));
  };
  handleSubmit = e => {
    e.preventDefault();
    const id = this.state.cartId;
    const data = {
      quantity: this.state.quantity
    };

    axios
      .put(`carts/${id}`, data, {
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
    //this.props.handleSubmit(data);
  };

  render() {
    console.log(this.state.carts);
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
                      <form onSubmit={this.handleSubmit}>
                        <label>
                          <input
                            type="number"
                            name="quantity"
                            // value={cart.quantity}
                            id={cart._id}
                            defaultValue={cart.quantity}
                            min="1"
                            max="50"
                            onChange={this.handleQuantity}
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
                            .delete(`carts/${cart._id}`, {
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
            <TotalCart carts={this.state.carts} />
            <div>
              <button>Proceed to By</button>
            </div>
          </div>
        );
      } else {
        return <h2>please add products to Cart</h2>;
      }
    } else {
      return <h2>please login to show the cart</h2>;
    }
  }
}

export default Cart;
