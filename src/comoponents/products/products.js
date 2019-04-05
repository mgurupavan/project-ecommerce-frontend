import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/config";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col
} from "reactstrap";
// function cat() {
// 	axios.get(`/categories`).then(response => {
// 		console.log(response.data);
// 	});
// }
// var cate = cat();
class Product extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      resData: ""
    };
  }
  componentDidMount() {
    axios.get("/products").then(response => {
      const products = response.data;
      // console.log(response.data[0].category.name);
      this.setState(() => ({ products: products }));
    });
  }

  render() {
    //console.log(this.state.resData);
    return (
      <div>
        <h5>Products - {this.state.products.length}</h5>
        <ul>
          {this.state.products.map(product => {
            return (
              <div key={product._id}>
                <Row>
                  <Col xs="3">
                    <Card>
                      <img
                        // top
                        width="120"
                        height="176"
                        src={product.imageUrl}
                        alt={product.name}
                      />
                      <CardBody>
                        <CardTitle>
                          <Link to={`/products/${product._id}`}>
                            {product.name}
                          </Link>{" "}
                        </CardTitle>
                        <CardSubtitle>
                          category-{product.category.name}
                          <br />
                          <p>price -{product.price}</p>
                        </CardSubtitle>
                        <Button
                          onClick={() => {
                            const data = {
                              product: product._id,
                              quantity: 1
                            };
                            axios
                              .post(`/carts`, data, {
                                headers: {
                                  "x-auth": localStorage.getItem("token")
                                }
                              })
                              .then(response => {
                                this.setState({
                                  resData: response.data.statusText
                                });
                                console.log(response.data);
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          }}
                        >
                          Add to cart
                        </Button>
                        <p>{this.state.resData}</p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                {/* <h5>
                  <span style={{ color: "green" }}>
                    {product.category.name}
                  </span>
                </h5> */}
                {/* <img
                  src={product.imageUrl}
                  alt="productImg"
                  width="100"
                  hight="100"
                /> */}
              </div>
            );
          })}
        </ul>
        <Link to="products/add">Add Product</Link>
      </div>
    );
  }
}

export default Product;
