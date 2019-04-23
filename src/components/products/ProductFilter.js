import React from "react";
import ListingProducts from "./ListingProducts";

class ProductFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredValue: 0
    };
  }
  handlePrice = e => {
    let value = parseInt(e.target.value, 10);
    this.setState(() => ({ filteredValue: value }));
  };
  render() {
    return (
      <div>
        <form onChange={this.handlePrice}>
          price value <br />
          <input type="radio" name="price" value="500" /> lessthan 500 <br />
          <input type="radio" name="price" value="1000" /> lessthan 1000 <br />
          <input type="radio" name="price" value="2000" /> lessthan 2000 <br />
        </form>
        <ListingProducts
          filteredValue={this.state.filteredValue}
          search={this.props.search}
        />
      </div>
    );
  }
}
export default ProductFilter;
