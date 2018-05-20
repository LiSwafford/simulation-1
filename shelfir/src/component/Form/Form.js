import React, { Component } from "react";
import axios from "axios";
import "./Form.css";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: 0,
      img: "",
      selectPro: []
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }
  handleNameChange(value) {
    this.setState({ name: value });
  }
  handlePriceChange(value) {
    this.setState({ price: value });
  }
  handleImgChange(value) {
    this.setState({ img: value });
  }

  handleCancel() {
    this.setState({
      name: "",
      price: 0,
      img: ""
    });
  }

  createProduct() {
    const { name, price, img } = this.state;
    let reqBody = {
      name,
      price,
      img
    };

    // console.log(reqBody);
    axios
      .post("/api/product", reqBody)
      .then(results => {
        console.log(results);
        this.setState({ inventoryList: results.data });
      })
      .then(() => this.props.getProducts())
      .then(
        this.setState({
          name: "",
          price: 0,
          img: ""
        })
      )
      .catch(() => console.log("axios.post didnt work"));
  }
  updateProduct(id) {
    axios
      .put(`/api/product/${id}`, {
        name: this.state.name,
        price: this.state.price,
        img: this.state.img
      })
      .then(results => {
        console.log(results);
        this.setState({ selectPro: results.data });
      })
      .then(() => this.props.getProducts())
      .then(
        this.setState({
          name: "",
          price: 0,
          img: ""
        })
      );
  }

  componentDidUpdate(oldProps) {
    // console.log("component did update");
    if (this.props.selectProduct !== oldProps.selectProduct) {
      this.setState({
        name: this.props.selectProduct.name,
        price: this.props.selectProduct.price,
        img: this.props.selectProduct.img
      });
      console.log("component did update");
    }
  }

  render() {
    console.log(this.state);
    let formButton;
    if (this.props.selectProduct === null) {
      formButton = (
        <button
          className="formBtns inventoryBtn"
          onClick={() => this.createProduct()}
        >
          {" "}
          Add to inventory
        </button>
      );
    } else {
      formButton = (
        <button
          className="formBtns saveBtn"
          onClick={() => this.updateProduct(this.props.selectProduct.id)}
        >
          {" "}
          Save Changes
        </button>
      );
    }

    return (
      <div className="form-container">
        <span> Image URL </span>
        <input
          className="input-box"
          value={this.state.img}
          onChange={e => this.handleImgChange(e.target.value)}
        />
        <p> Produc Name </p>
        <input
          className="input-box"
          value={this.state.name}
          onChange={e => this.handleNameChange(e.target.value)}
        />
        <p> Price </p>
        <input
          className="input-box"
          value={this.state.price}
          onChange={e => this.handlePriceChange(e.target.value)}
        />
        <div className="btn-box">
          <button className="formBtns cancleBtn" onClick={this.handleCancel}>
            {" "}
            Cancle
          </button>
          {formButton}
        </div>
        {/* <button onClick={() => this.createProduct()}> Add to inventory</button> */}
      </div>
    );
  }
}

export default Form;

// funtion() {
//   createProduct()
// }
