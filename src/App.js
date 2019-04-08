import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Categories from "./comoponents/categories";
import CategoryShow from "./comoponents/CategoryShow";
import CategoryEdit from "./comoponents/CategoryEdit";
import Register from "./comoponents/users/Register";
import Login from "./comoponents/users/Login";
import Product from "./comoponents/products/products";
import AddProduct from "./comoponents/products/ProductAdd";
import ProductEdit from "./comoponents/products/ProductEdit";
import ProductShow from "./comoponents/products/ProductShow";
import NewCategory from "./comoponents/CategoryAdd";
import Logout from "./comoponents/users/Logout";
import Home from "./comoponents/Home/Home";
import Notfound from "./comoponents/Home/NotFound";
// import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Carts from "./comoponents/Cart/Carts";
import MonthlyCart from "./comoponents/MonthlyCart/MonthlyCart";

import "./App.css";
import Addresses from "./comoponents/Addresses/Addresses";
import AddAddress from "./comoponents/Addresses/AddAddress";
import AddressEdit from "./comoponents/Addresses/AddressEdit";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div id="navBar">
            <div id="topHalf">
              <div id="logoWrapper">
                <img
                  id="logo"
                  src="http://www.userlogos.org/files/logos/ArkAngel06/Amazon.p"
                  alt="logo"
                />
              </div>
              <input id="in" type="text" placeholder="Search" />
              <img id="backToSchool" src="/" alt="Offer" />
            </div>

            <div id="bottomHalf">
              <div id="sections">
                <div className="section">
                  <Link
                    className="a"
                    style={{ color: "white", textDecoration: "none" }}
                    to="/home"
                  >
                    Home
                  </Link>
                </div>
                <div className="section">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/categories"
                  >
                    Shop by Categories
                  </Link>
                </div>
                <div className="section">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/deals"
                  >
                    Today Deal's
                  </Link>
                </div>
                <div className="section">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/products"
                  >
                    Products
                  </Link>
                </div>
                <div className="section">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/help"
                  >
                    Help
                  </Link>
                </div>
              </div>
              <div id="accountStuff">
                <div className="section">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/user/cart"
                  >
                    Cart
                  </Link>
                </div>
                <div className="section">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/user/monthlycart"
                  >
                    MonthlyCart
                  </Link>
                </div>
                <div className="section">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/user/register"
                  >
                    Register
                  </Link>
                </div>
                <div className="section">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/user/login"
                  >
                    Login
                  </Link>
                </div>
                <div className="section">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/user/addresses"
                  >
                    Your Addresses
                  </Link>
                </div>
                <div className="section">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/user/logout"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="navigation">
						<Link to="/home">Home</Link>
						<Link to="/categories"> Categories</Link>
						<Link to="/products">Products</Link>
						<Link to="/user/cart">Cart</Link>
						<Link to="/user/register">Register</Link>
						<Link to="/user/login">Login</Link>
						<Link to="/user/logout">Logout</Link>
					</div> */}
          <Switch>
            <Route path="/categories" component={Categories} exact={true} />
            <Route path="/categories/add" component={NewCategory} />
            <Route
              path="/categories/:id"
              component={CategoryShow}
              exact={true}
            />
            <Route path="/categories/edit/:id" component={CategoryEdit} />
            <Route path="/products" component={Product} exact={true} />
            <Route path="/products/add" component={AddProduct} exact={true} />
            <Route path="/products/:id" component={ProductShow} exact={true} />
            <Route path="/product/edit/:id" component={ProductEdit} />
            <Route path="/user/register" component={Register} exact />
            <Route path="/user/login" component={Login} />
            <Route path="/user/addresses" component={Addresses} exact />
            <Route path="/user/addresses/add" component={AddAddress} />
            <Route path="/user/addresses/edit/:id" component={AddressEdit} />
            <Route path="/user/logout" component={Logout} />
            <Route path="/user/cart" component={Carts} />
            <Route path="/user/monthlycart" component={MonthlyCart} />
            <Route path="/home" component={Home} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
