import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/config";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ProductFilter from "./ProductFilter";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  }
});
class Product extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      onLoad: false
    };
  }
  componentDidMount() {
    axios.get("/products").then(response => {
      const products = response.data;
      this.setState(() => ({ products: products, onLoad: true }));
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="products">
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginLeft: "1080px", marginTop: "5px" }}
        >
          <Link
            to="products/add"
            style={{
              float: "right",
              color: "#F50057",
              textDecoration: "none"
            }}
          >
            Add Product
          </Link>
        </Button>
        <CssBaseline />
        <main>
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                component="h6"
                variant="subtitle2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                <img src="#" alt="g" />
              </Typography>
            </div>
          </div>
          {this.state.onLoad && (
            <ProductFilter products={this.state.products} />
          )}

          {/* <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={8}>
              {this.state.products.map(product => (
                <Grid item key={product._id} md={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={product.imageUrl}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography variant="title" component="h6">
                        <Link
                          to={`/products/${product._id}`}
                          style={{
                            textDecoration: "none",
                            color: "black"
                          }}
                        >
                          {product.name}
                        </Link>
                      </Typography>
                      <Typography style={{ color: "green" }}>
                        {product.category.name}
                      </Typography>
                      <Typography>&#x20B9; {product.price}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div> */}
        </main>
      </div>
    );
  }
}
Product.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Product);
