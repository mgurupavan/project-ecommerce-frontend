import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
// import decode from "jwt-decode";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    maxWidth: 1300,
    maxHeight: "auto"
  },
  image: {
    width: 240,
    height: 220
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});
class ProductShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      reviews: [],
      loadedReview: false,
      isload: false
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/products/${id}`).then(response => {
      const products = response.data;
      this.setState(() => ({ products: products }));
    });
    axios
      .get("/reviews")
      .then(response => {
        this.setState(() => ({ reviews: response.data }));
      })
      .catch(err => {
        console.log(err, "err");
      });
  }
  handleDelete = () => {
    const confirm = window.confirm("Are You Sure");
    const id = this.props.match.params.id;
    if (confirm) {
      axios
        .delete(`products/${id}`, {
          headers: {
            "x-auth": localStorage.getItem("token")
          }
        })
        .then(response => {
          this.props.history.push("/products"); // this anthor way of redireact
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  handleCart = () => {
    const data = {
      product: this.props.match.params.id,
      quantity: 1
    };
    axios
      .post(`/carts`, data, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {})
      .catch(err => {
        console.log(err);
      });
  };
  handleMonthlyCart = () => {
    const data = {
      product: this.props.match.params.id,
      quantity: 1
    };
    const conform = window.confirm(
      "Are you sure this items repeated every month!"
    );
    if (conform) {
      axios
        .post(`/monthlycarts`, data, {
          headers: {
            "x-auth": localStorage.getItem("token")
          }
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    console.log(this.state.products);
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={16}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    src={this.state.products.imageUrl}
                    alt="productImg"
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={24}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {this.state.products.name}
                    </Typography>
                    <Typography gutterBottom>
                      description: {this.state.products.description}
                    </Typography>
                    <Typography color="textPrimary" style={{ color: "red" }}>
                      &#x20B9; {this.state.products.price}
                    </Typography>
                  </Grid>
                  {/* <Grid item>
										<Typography style={{ cursor: "pointer" }}>
											Remove
										</Typography>
									</Grid> */}
                </Grid>
                <Grid item>
                  <Button
                    color="secondary"
                    size="small"
                    variant="outlined"
                    onClick={this.handleCart}
                  >
                    <Typography
                      style={{ color: "#F50057", textDecoration: "none" }}
                    >
                      Add Cart
                    </Typography>
                  </Button>
                  <br />
                  <br />
                  <Button
                    color="secondary"
                    size="small"
                    variant="outlined"
                    onClick={this.handleMonthlyCart}
                  >
                    <Typography
                      style={{ color: "#F50057", textDecoration: "none" }}
                    >
                      Add Monthly Cart
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <br />
        <Button color="secondary" size="small" variant="outlined">
          <Link
            style={{ color: "#F50057", textDecoration: "none" }}
            to={`/product/edit/${this.props.match.params.id}`}
          >
            Edit
          </Link>
        </Button>

        <Button
          color="secondary"
          size="small"
          variant="outlined"
          onClick={this.handleDelete}
          style={{ marginLeft: "13px" }}
        >
          Delete
        </Button>

        <br />
        <br />
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={16}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h5">
                      Reviews
                    </Typography>
                    {this.state.reviews.map(review => {
                      if (this.state.products._id === review.product) {
                        return (
                          <div key={review._id} className={classes.root}>
                            <Grid item>
                              <Typography gutterBottom variant="subtitle1">
                                {review.title} By:
                                <span
                                  style={{
                                    color: "#F50057",
                                    textDecoration: "underline"
                                  }}
                                >
                                  {review.user.username}
                                </span>
                              </Typography>
                              <Typography>{review.body}</Typography>
                              <Typography>{review.rating}</Typography>
                            </Grid>

                            <hr />
                          </div>
                        );
                      } else {
                        return "";
                      }
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>

        <br />
        <br />
        <Link
          style={{ textDecoration: "none" }}
          to={`/products/user/reviews/${this.props.match.params.id}`}
        >
          <Button color="secondary" size="small" variant="outlined">
            Write a product review
          </Button>
        </Link>
      </div>
    );
  }
}
ProductShow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductShow);
