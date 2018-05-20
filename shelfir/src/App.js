import React, { Component } from "react";
import "./App.css";
import Dashboard from "./component/Dashboard/Dashboard";
import Form from "./component/Form/Form";
import Header from "./component/Header/Header";
import axios from "axios";
import { HashRouter, Link, Switch } from "react-router-dom";
import routes from "./routes";

class App extends Component {
  constructor() {
    super();

    this.state = {
      inventoryList: [
        // { name: "boots", price: 200, img: "https://http.cat/409" },
        // { name: "jacket", price: 300, img: "https://http.cat/408" },
        // { name: "jeans", price: 150, img: "https://http.cat/410" }
      ],
      selectProduct: null
    };

    this.getProducts = this.getProducts.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  getProducts() {
    axios.get("/api/inventory").then(results => {
      console.log(results);
      this.setState({ inventoryList: results.data });
      // console.log(results.data.element);
    });
  }

  componentDidMount() {
    this.getProducts();
  }

  handleEdit(value) {
    // console.log(value);
    this.setState({ selectProduct: value });
  }

  render() {
    console.log(this.state.selectProduct);
    // const { inventoryList } = this.state;
    // console.log(this.state.inventoryList);
    return (
      <div className="App">
        <header className="App-header">
          SHELFIE
          <button> Dashboard </button>
        </header>
        <Dashboard
          inventoryList={this.state.inventoryList}
          getProducts={this.getProducts}
          handleEdit={this.handleEdit}
        />
        <div className="form-box">
          <Form
            getProducts={this.getProducts}
            selectProduct={this.state.selectProduct}
            // createProduct={this.createProduct}
          />
        </div>
        {/* {routes} */}
      </div>
    );
  }
}

export default App;
