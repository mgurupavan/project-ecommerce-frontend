import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/config";
import PropTypes from "prop-types";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

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
  },
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
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
});
class Product extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    axios.get("/products").then(response => {
      const products = response.data;
      this.setState(() => ({ products: products }));
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
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
          <div className={classNames(classes.layout, classes.cardGrid)}>
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
          </div>
        </main>
      </div>
    );
  }
}
Product.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Product);
