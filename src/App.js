import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Categories from "./components/Categories/categories";
import CategoryShow from "./components/Categories/CategoryShow";
import CategoryEdit from "./components/Categories/CategoryEdit";
import NewCategory from "./components/Categories/CategoryAdd";

import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Logout from "./components/users/Logout";

import Product from "./components/products/products";
import AddProduct from "./components/products/ProductAdd";
import ProductEdit from "./components/products/ProductEdit";
import ProductShow from "./components/products/ProductShow";

import Carts from "./components/Cart/Carts";
import MonthlyCarts from "./components/MonthlyCart/MonthlyCart";

import OrderHistory from "./components/Orders/OrdersHistory";
// import axios from "./config/config";

import Addresses from "./components/Addresses/Addresses";
import AddAddress from "./components/Addresses/AddAddress";
import AddressEdit from "./components/Addresses/AddressEdit";
import ReviewAdd from "./components/Reviews/ReviewAdd";

import Select from "./components/Addresses/Select";
import Help from "./components/Help/Help";

import Home from "./components/Home/Home";
import Notfound from "./components/Home/NotFound";

import "./App.css";
// import decode from "jwt-decode";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      search: "",
      admin: false,
      user: false,
      isAuth: false
    };
  }

  handleLogin = () => {
    this.setState(() => ({
      isAuth: true
    }));
  };
  handleLogout = () => {
    this.setState(() => ({
      isAuth: false
    }));
  };

  searchHandle = e => {
    const searchValue = e.target.value;
    this.setState(() => ({ search: searchValue }));
  };
  render() {
    console.log(this.state.search);
    return (
      <BrowserRouter>
        <div>
          <div id="navBar">
            <div id="topHalf">
              <div id="logoWrapper">
                <img
                  id="logo"
                  src="http://www.userlogos.org/files/logos/ArkAngel06/Amazon.pn"
                  alt="logo"
                />
              </div>
              <input
                id="in"
                type="text"
                value={this.state.search}
                placeholder="Search"
                onChange={this.searchHandle}
              />
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
                    to="/user/register"
                  >
                    Register
                  </Link>
                </div>
                <div className="section">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/user/orders"
                  >
                    Orders
                  </Link>
                </div>
                {!this.state.isAuth ? (
                  <div className="section">
                    <Link
                      style={{ color: "white", textDecoration: "none" }}
                      to="/user/login"
                    >
                      Login
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                <div className="section">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/user/addresses"
                  >
                    Your Addresses
                  </Link>
                </div>
                {this.state.isAuth ? (
                  <div className="section">
                    <Link
                      style={{ color: "white", textDecoration: "none" }}
                      to="/user/logout"
                    >
                      Logout
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
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
            <Route
              path="/categories/edit/:id"
              component={CategoryEdit}
              exact={true}
            />

            <Route
              path="/products"
              render={props => {
                return <Product {...props} search={this.state.search} />;
              }}
              exact={true}
            />
            <Route path="/products/add" component={AddProduct} exact={true} />
            <Route path="/products/:id" component={ProductShow} exact={true} />
            <Route
              path="/product/edit/:id"
              component={ProductEdit}
              exact={true}
            />
            <Route path="/user/register" component={Register} exact={true} />
            <Route path="/user/orders" component={OrderHistory} exact={true} />
            <Route
              path="/user/login"
              render={props => {
                return <Login {...props} handleLogin={this.handleLogin} />;
              }}
            />
            <Route path="/user/addresses" component={Addresses} exact={true} />
            <Route
              path="/user/addresses/add"
              component={AddAddress}
              exact={true}
            />
            <Route
              path="/user/addresses/edit/:id"
              component={AddressEdit}
              exact={true}
            />
            <Route
              path="/user/select/addresses"
              component={Select}
              exact={true}
            />
            <Route
              path="/user/logout"
              render={props => {
                return <Logout {...props} handleLogout={this.handleLogout} />;
              }}
            />
            <Route path="/user/cart" component={Carts} exact={true} />
            <Route
              path="/user/monthlycart"
              component={MonthlyCarts}
              exact={true}
            />
            <Route
              path="/products/user/reviews/:id"
              component={ReviewAdd}
              exact={true}
            />
            <Route path="/help" component={Help} exact={true} />
            <Route path="/home" component={Home} exact={true} />
            <Route path="/" component={Home} exact={true} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
