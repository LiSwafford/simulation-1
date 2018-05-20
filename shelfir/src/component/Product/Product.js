import React from "react";
import "./Product.css";

export default function Header(props) {
  // console.log(props.productElement.id);
  return (
    <div className="products-box">
      <div className="pdct-info">
        <img src={props.productElement.img} alt="" />
        <p>Name: {props.productElement.name}</p>
        <p>Price: {props.productElement.price}</p>
        <button
          className="productBtn deleteBtn"
          onClick={() => props.deleteProduct(props.productElement.id)}
        >
          Delete
        </button>
        <button
          className="productBtn editBtn"
          onClick={() => props.handleEdit(props.productElement)}
        >
          {" "}
          Edit
        </button>
      </div>
    </div>
  );
}
