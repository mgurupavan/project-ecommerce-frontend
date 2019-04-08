import React, { Component } from "react";
//import axios from "../../config/config";

class TotalCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carts: props.carts,
      totalCart: 0,
      total: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.carts.length !== nextProps.carts.length) {
      this.setState(() => ({ carts: nextProps.carts }));
    }
    // if (this.state.carts === nextProps.carts) {
    //   console.log("updated");
    // }
  }

  render() {
    let total = 0;
    for (let i = 0; i <= this.state.carts.length - 1; i++) {
      total += this.state.carts[i].quantity * this.state.carts[i].product.price;
    }

    return (
      <div>
        <p style={{ fontSize: "1.2rem", float: "right" }}>
          Subtotal({this.state.carts.length}items):{total}
        </p>
      </div>
    );
  }
}

export default TotalCart;
