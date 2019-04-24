import React from "react";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "../../config/config";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1
  }
});

class ListingProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredValue: this.props.filteredValue,
      search: this.props.search
    };
  }
  componentDidMount() {
    axios.get("/products").then(response => {
      const products = response.data;
      this.setState(() => ({ products }));
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.filteredValue !== this.props.filteredValue) {
      let filteredValue = nextProps.filteredValue;
      this.setState(() => ({ filteredValue }));
    }
    if (nextProps.search !== this.props.search) {
      let search = nextProps.search;
      this.setState(() => ({ search }));
    }
  }
  render() {
    const { classes } = this.props;
    let products = [];
    if (this.state.filteredValue !== 0) {
      this.state.products.forEach(product => {
        if (product.price <= this.state.filteredValue) {
          products.push(product);
        }
      });
    } else {
      products = this.state.products;
    }
    if (this.state.search) {
      var searchedProducts = [];
      let search = this.state.search.toLowerCase();
      this.state.products.forEach(product => {
        let productCategory = product.category.name.toLowerCase();
        //console.log(productCategory);
        let productName = product.name.toLowerCase();
        if (
          productName.search(search) >= 0 ||
          productCategory.search(search) >= 0
        ) {
          searchedProducts.push(product);
        }
      });
      if (searchedProducts[0]) {
        products = searchedProducts;
      } else {
        products = [];
      }
    }

    if (products[0]) {
      return (
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={8}>
            {products.map(product => (
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
        </div>
      );
    }
    return <h2> no products found</h2>;
  }
}

ListingProducts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListingProducts);
