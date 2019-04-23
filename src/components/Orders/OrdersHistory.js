import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: false
    };
  }
  componentDidMount() {
    axios
      .get("/orders", {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data);
        this.setState(() => ({ orders: response.data, order: true }));
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <h3>Your Orders</h3>
        {this.state.order && (
          <div>
            {this.state.orders.map(product => {
              return (
                <div key={product._id}>
                  {product.order.map(order => {
                    return (
                      <div key={order._id}>
                        <div>
                          <span>Date of placed : </span>
                          {order.orderAt} <br />
                          <span>OrderNumber : </span>
                          {order.orderNumber}
                          {order.lineItems.map(cart => {
                            return (
                              <div key={cart.product._id}>
                                <p>
                                  <Link to={`/products/${cart.product._id}`}>
                                    {cart.product.name}
                                  </Link>
                                </p>{" "}
                                <br />
                                <img
                                  src={cart.product.imageUrl}
                                  alt="product"
                                  heigth="100"
                                  width="100"
                                />
                                <p>&#x20B9; {cart.product.price}</p>
                                <p>
                                  total: {cart.product.price}*{cart.quantity}=
                                  &#x20B9; {cart.quantity * cart.price}
                                </p>
                                <hr />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default OrderHistory;
