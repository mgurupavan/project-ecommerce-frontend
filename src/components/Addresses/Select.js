import React, { Component } from "react";
import Addresses from "./Addresses";
import axios from "../../config/config";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carts: [],
      cart: false
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
        this.setState(() => ({ carts: response.data.cart, cart: true }));
      })
      .catch(err => {
        console.log(err);
      });
  }
  placeOrder = () => {
    const data = {
      lineItems: []
    };
    this.state.carts.forEach(cart => {
      data.lineItems.push({
        product: cart.product._id,
        quantity: cart.quantity,
        price: cart.product.price
      });
    });
    // console.log(data);
    axios
      .post("/orders", data, {
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
    return (
      <div>
        <Addresses />
        <label>
          Select Address: <br />
          <select name="addresses" id="">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>

        <br />
        <button onClick={this.placeOrder}>Place the Order</button>
      </div>
    );
  }
}

export default Select;
