import React, { Component } from "react";
import axios from "../../config/config";
class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name ? props.name : "",
      description: props.description ? props.description : "",
      price: props.price ? props.price : "",
      stock: props.stock ? props.stock : "",
      isCod: props.isCod ? props.isCod : "",
      category: props.category ? props.category : "",
      imageUrl: props.imageUrl ? props.imageUrl : null,
      categories: [],
      nameErr: "",
      descriptionErr: "",
      priceErr: "",
      stockErr: "",
      categoriesErr: ""
    };
  }
  componentDidMount() {
    axios
      .get("/categories")
      .then(response => {
        const categories = response.data;
        this.setState(() => ({ categories: categories }));
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleName = e => {
    e.persist();
    this.setState(() => ({ name: e.target.value }));
  };
  handleDescription = e => {
    e.persist();
    this.setState(() => ({ description: e.target.value }));
  };
  handlePrice = e => {
    e.persist();
    if (e.target.value > 0) {
      this.setState(() => ({ price: e.target.value }));
    }
  };
  handleStock = e => {
    e.persist();
    if (e.target.value >= 0) {
      this.setState(() => ({ stock: e.target.value }));
    }
  };
  handleIsCod = e => {
    e.persist();
    this.setState(() => ({ isCod: e.target.value }));
  };
  handleCategory = e => {
    e.persist();
    const category = e.target.value;

    this.setState(() => ({ category: category }));
  };
  handleFile = e => {
    e.persist();
    const img = e.target.files[0];
    this.setState(() => ({ imageUrl: img }));
  };
  validate = () => {
    let isErr = false;
    const errors = {
      nameErr: "",
      descriptionErr: "",
      priceErr: "",
      stockErr: "",
      categoriesErr: "",
      isCodErr: ""
    };
    if (this.state.name.length < 3) {
      isErr = true;
      errors.nameErr = "please provide valid name";
    }
    if (this.state.description.length < 5) {
      isErr = true;
      errors.descriptionErr = "describe the product properly";
    }
    if (this.state.price < 2) {
      isErr = true;
      errors.priceErr = "minimum price value is 2";
    }
    if (this.state.stock < 1) {
      isErr = true;
      errors.stockErr = "minimum stock value is 1";
    }
    if (!this.state.isCod) {
      isErr = true;
      errors.isCodErr = "please select a category";
    }
    if (!this.state.categories) {
      isErr = true;
      errors.categoriesErr = "please select a category";
    }
    this.setState({
      ...this.state,
      ...errors
    });
    return isErr;
  };
  handleSubmit = e => {
    e.preventDefault();
    //when we send the images with text  req.file has body send it img also text also like this way
    // const img = new FormData();
    // img.append("imageUrl", this.state.imageUrl);
    const err = this.validate();
    if (!err) {
      const data = new FormData();
      data.append("name", this.state.name);
      data.append("description", this.state.description);
      data.append("price", this.state.price);
      data.append("stock", this.state.stock);
      data.append("isCod", this.state.isCod);
      data.append("category", this.state.category);
      data.append("imageUrl", this.state.imageUrl);
      // console.log(data);
      // const data = {
      // 	name: this.state.name,
      // 	description: this.state.description,
      // 	price: this.state.price,
      // 	stock: this.state.stock,
      // 	isCod: this.state.isCod,
      // 	category: this.state.category,
      // 	imageUrl: this.state.imageUrl
      // };

      this.props.handleSubmit(data);
      this.setState(() => ({
        name: "",
        description: "",
        price: "",
        stock: "",
        isCod: "",
        category: ""
      }));
    }
  };
  render() {
    // console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name Of Product:
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="name"
              onChange={this.handleName}
            />{" "}
            <span style={{ color: "red", fontSize: "0.8rem", opacity: "1" }}>
              {this.state.nameErr}
            </span>
          </label>
          <br />
          <label>
            Descprition:
            <textarea
              name="description"
              placeholder="description of product"
              value={this.state.description}
              onChange={this.handleDescription}
            />
            <span style={{ color: "red", fontSize: "0.8rem", opacity: "1" }}>
              {this.state.descriptionErr}
            </span>
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              name="price"
              placeholder="price value"
              value={this.state.price}
              onChange={this.handlePrice}
            />{" "}
            <span style={{ color: "red", fontSize: "0.8rem", opacity: "1" }}>
              {this.state.priceErr}
            </span>
          </label>
          <br />
          <label>
            Stock:
            <input
              type="number"
              name="stock"
              placeholder="stock"
              value={this.state.stock}
              onChange={this.handleStock}
            />{" "}
            <span style={{ color: "red", fontSize: "0.8rem", opacity: "1" }}>
              {this.state.stockErr}
            </span>
          </label>
          <br />
          <label>
            Cash On Delivery:
            <input
              type="radio"
              name="isCod"
              value="true"
              checked={this.state.isCod === "true"} //this anthor way of handling radio buttons
              onChange={this.handleIsCod}
              //defaultChecked
            />{" "}
            True
            <input
              type="radio"
              name="isCod"
              value="false"
              checked={this.state.isCod === "false"}
              onChange={this.handleIsCod}
            />
            False -
            <span style={{ color: "red", fontSize: "0.8rem", opacity: "1" }}>
              {" "}
              {this.state.isCodErr}
            </span>
          </label>
          <br />
          Select Category:
          <select name="categories" onChange={this.handleCategory}>
            <option value="select">select</option>
            {this.state.categories.map(cate => {
              return (
                <option value={cate._id} key={cate._id}>
                  {cate.name}
                </option>
              );
            })}
          </select>{" "}
          <span style={{ color: "red", fontSize: "0.8rem", opacity: "1" }}>
            {this.state.categoriesErr}
          </span>
          <br />
          <label>
            <input
              type="file"
              name="imageUrl"
              accept="image/*"
              encType="multipart/form-data"
              value={this.state.file}
              onChange={this.handleFile}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ProductForm;
