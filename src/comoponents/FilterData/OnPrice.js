import React, { Component } from "react";
import axios from "../../config/config";

class OnPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    axios.get("/products").then(response => {
      const products = response.data;
      this.setState(() => ({ products: products }));
    });
  }
  render() {
    return (
      <div>
        <form>
          <label>
            <input type="radio" name="500" id="" />
          </label>
        </form>
      </div>
    );
  }
}

export default OnPrice;
