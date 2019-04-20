import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
import AddressForm from "./AddressForm";

class AddAddress extends Component {
  handleSubmit = formData => {
    axios
      .post("/addresses", formData, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(responce => {
        //this.props.history.push("/user/addresses");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <h5>Add Product Here</h5>
        <AddressForm handleSubmit={this.handleSubmit} />
        <Link to="/user/addresses">Back</Link>
      </div>
    );
  }
}

export default AddAddress;
