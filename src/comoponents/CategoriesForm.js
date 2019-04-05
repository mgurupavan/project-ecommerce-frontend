import React, { Component } from "react";
import { Link } from "react-router-dom";

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name ? props.name : "",
      nameErr: ""
    };
  }
  validate = () => {
    let isErr = false;
    const errors = {
      nameErr: ""
    };
    if (this.state.name.length < 3) {
      isErr = true;
      errors.nameErr = "please provide valid category name";
    }
    this.setState({
      ...this.state,
      ...errors
    });
    return isErr;
  };
  handleName = e => {
    e.persist();
    this.setState(() => ({
      name: e.target.value
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      const formData = {
        name: this.state.name
      };
      this.props.handleSubmit(formData);
      this.setState(() => ({ name: "" }));
    }
  };

  render() {
    // console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name Of Category:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleName}
              placeholder="category name"
            />{" "}
            <span style={{ color: "red", fontSize: "0.8rem", opacity: "1" }}>
              {" "}
              {this.state.nameErr}{" "}
            </span>
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
        <Link to="/categories">Back</Link>
      </div>
    );
  }
}

export default CategoryForm;
