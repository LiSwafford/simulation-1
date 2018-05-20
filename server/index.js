const express = require("express");
const { json } = require("body-parser");
const port = process.env.PORT || 4000;
const app = express();
const ctr = require("./controller");

app.use(json());

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
