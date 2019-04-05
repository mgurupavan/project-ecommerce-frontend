import React, { Component } from "react";
//import axios from "../../config/config";

class TotalCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carts: props.cart,
      totalCart: 0,
      total: 0
    };
  }
  // componentDidMount() {
  //   axios
  //     .get("/carts", {
  //       headers: {
  //         "x-auth": localStorage.getItem("token")
  //       }
  //     })
  //     .then(response => {
  //       this.setState(() => ({ carts: response.data.cart, cart: true }));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  componentWillReceiveProps(nextProps) {
    if (this.state.carts.length !== nextProps.cart.length) {
      this.setState(() => ({ carts: nextProps.cart }));
    }
  }

  render() {
    // console.log(this.state.carts);
    // this.setState(() => ({ totalCart: total }))
    //console.log(this.state.carts);
    let total = 0;
    for (let i = 0; i < this.state.carts.length; i++) {
      total +=
        this.state.carts[i].product.stock * this.state.carts[i].product.price;
    }

    console.log(this.state.carts, "total cart");
    return (
      <div>
        {/* {this.state.carts.map(cart => {
          this.state.total += cart.product.stock * cart.product.price;
        })} */}
        <p style={{ fontSize: "1.2rem", float: "right" }}>
          Subtotal({this.state.carts.length}items):{total}
        </p>
      </div>
    );
  }
}

export default TotalCart;
