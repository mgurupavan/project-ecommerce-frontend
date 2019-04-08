import React, { Component } from "react";

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: props.fullname ? props.fullname : "",
      mobile: props.mobile ? props.mobile : "",
      city: props.city ? props.city : "",
      street: props.street ? props.street : "",
      landmark: props.landmark ? props.landmark : "",
      postalCode: props.postalCode ? props.postalCode : ""
    };
  }
  handleChange = e => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
    const formData = {
      fullname: this.state.fullname,
      mobile: this.state.mobile,
      city: this.state.city,
      street: this.state.street,
      landmark: this.state.landmark,
      postalCode: this.state.postalCode
    };
    this.props.handleSubmit(formData);
    this.setState(() => ({
      fullname: "",
      mobile: "",
      city: "",
      street: "",
      landmark: "",
      postalCode: ""
    }));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            FullName:
            <input
              type="text"
              name="fullname"
              value={this.state.fullname}
              onChange={this.handleChange}
              size="35"
            />
          </label>
          <br />
          <label>
            Mobile:
            <input
              type="text"
              name="mobile"
              value={this.state.mobile}
              onChange={this.handleChange}
              size="35"
            />
          </label>
          <br />
          <label>
            City:
            <input
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              size="35"
            />
          </label>
          <br />
          <label>
            Street/Door No:
            <input
              type="text"
              name="street"
              value={this.state.street}
              onChange={this.handleChange}
              size="35"
            />
          </label>
          <br />
          <label>
            Landmark:
            <input
              type="text"
              name="landmark"
              value={this.state.landmark}
              onChange={this.handleChange}
              size="35"
            />
          </label>
          <br />
          <label>
            PostalCode:
            <input
              type="text"
              name="postalCode"
              value={this.state.postalCode}
              onChange={this.handleChange}
              size="35"
            />
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default AddressForm;
