require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");

const app = express();

app.use(json());
app.use(cors());
const port = process.env.PORT || 4000;

// endpoints
const {
  getInventory,
  createProduct,
  deleteProduct,
  updateProduct
} = require(`${__dirname}/controller`);

app.get("/api/inventory", getInventory);
app.post("/api/product", createProduct);
app.delete("/api/product/:id", deleteProduct);
app.put("/api/product/:id", updateProduct);

massive(process.env.CONNECTION_STRING)
  .then(db => {
    console.log("it is working");
    app.set("db", db);
  })
  .catch(err => {
    app.set("db", db);
    console.log(err);
  });

app.listen(port, () => {
  console.log(`listening on port: ${port}.`);
});
