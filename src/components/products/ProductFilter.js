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
  handleReset = e => {
    e.preventDefault();
    this.setState(() => ({ filteredValue: 0 }));
  };
  render() {
    return (
      <div>
        <form onChange={this.handlePrice}>
          price value <br />
          <input type="radio" name="price" value="500" /> lessthan 500 <br />
          <input type="radio" name="price" value="1000" /> lessthan 1000 <br />
          <button onClick={this.handleReset}>reset</button>
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
