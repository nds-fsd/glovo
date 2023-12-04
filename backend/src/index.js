const express = require("express");
const  {connectDB}  = require("./mongo/connection");
const cors = require("cors");
const app = express();
const productRoutes = require("../src/router/productRoutes");

app.use(cors());
app.use(express.json());
app.use(productRoutes);

connectDB().then(() => console.log("Connected to database"));

const server = app.listen(3000, () => {
  console.log("Server is up and running  🏃");
});