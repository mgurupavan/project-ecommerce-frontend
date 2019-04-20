import React, { Component } from "react";
import ProductForm from "./ProductForm";
import axios from "../../config/config";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});
class AddProduct extends Component {
  handleSubmit = data => {
    axios
      .post("/products", data, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data);
        this.props.history.push("/products");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <ProductForm handleSubmit={this.handleSubmit} />
        <div style={{ marginLeft: "15rem", float: "left" }}>
          <Button
            variant="text"
            color="secondary"
            size="small"
            className={classes.button}
          >
            <Link
              to="/products"
              style={{
                color: "#F50057",
                textDecoration: "none"
              }}
            >
              <i className="material-icons md-48">arrow_back</i>
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}
AddProduct.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddProduct);
