import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "60%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

function Help(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}> Products</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {" "}
            the products information will be displayed over here if you want to
            buy you can add it to the Cart or MonthlyCart{" "}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Cart</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            User can add products in the cart and he can proceed to the payment
            gateway in order to purchase the products in the cart.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Monthly Cart</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            If you want to repeat the products for every month on a specified
            date you can add it to the monthly cart so that we can proceed the
            products to your home directly
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Today deals</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {" "}
            All our hot deals will be displayed over here to make you happy{" "}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>COD</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            we are happy to say you that we are providing Cash on Delivery so
            that you can pay the money on delivery time
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>orders</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            you can check your order history so that you can place the product
            again in future
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>For more queries</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>please contact us **********</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

Help.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Help);
