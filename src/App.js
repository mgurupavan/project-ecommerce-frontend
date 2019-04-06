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
import Cart from "./comoponents/Cart/Carts";
import MonthlyCart from "./comoponents/MonthlyCart/MonthlyCart";
// import { AppBar, Toolbar, Typography } from "@material-ui/core";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/home">Home</Link> |{" "}
          <Link to="/categories"> Categories</Link> |{" "}
          <Link to="/products">Products</Link> |{" "}
          <Link to="/user/register">Register</Link> |{" "}
          <Link to="/user/login">Login</Link> |{" "}
          <Link to="/user/logout">Logout</Link> |{" "}
          <Link to="/user/cart">cart</Link> | {"  "}
          <Link to="/user/monthlycart">MonthlyCart </Link>
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
            <Route path="/user/register" component={Register} />
            <Route path="/user/login" component={Login} />
            <Route path="/user/logout" component={Logout} />
            <Route path="/user/cart" component={Cart} />
            <Route path="/home" component={Home} />
            <Route path="/user/monthlycart" component={MonthlyCart} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
