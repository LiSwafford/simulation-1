import React, { Component } from "react";
import Product from "../Product/Product";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this);
  }

  deleteProduct(id) {
    axios.delete(`/api/product/${id}`).then(result => {
      this.props.getProducts();
    });
  }

  render() {
    // console.log("here are my products: ", {this.props.inventoryList});

    let newList = this.props.inventoryList.map((element, index) => {
      // console.log(element);
      return (
        <Product
          key={index}
          productElement={element}
          deleteProduct={this.deleteProduct}
          handleEdit={this.props.handleEdit}
        />
      );
    });
    // console.log(newList);
    return <div>{newList}</div>;
  }
}

export default Dashboard;
