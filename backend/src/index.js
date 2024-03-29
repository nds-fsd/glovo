const express = require("express");
const { connectDB } = require("./mongo/connection");
const cors = require("cors");
const app = express();
const orderRouter = require("./router/UserRoutes");

const restauranteRoutes = require("../src/router/restauranteRoutes");
const productRoutes = require("./router/productRoutes");
const userRoutes = require("./router/UserRoutes");
const authRoutes = require("./router/Auth");
const orderRoutes = require("./router/orderRoutes");

app.use(cors());
app.use(express.json());
app.use(restauranteRoutes);
app.use(productRoutes);
app.use("/users", userRoutes);
app.use(authRoutes);
app.use(orderRoutes);

connectDB().then(() => console.log("Connected to database!"));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log("Server is up and running ⚡");
});
