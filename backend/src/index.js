const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require("./router/productRoutes");
// const { express: expressMiddleware } = require('react-query/express');
const app = express();
const port = 3000;


mongoose.connect("mongodb+srv://Nuclio:Nuclio123@gloton.ptdjeam.mongodb.net/",
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


// const productSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   state: String,
// });


// const Product = mongoose.model('Product', productSchema);

// app.use(productRoutes);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(expressMiddleware(queryClient));



// Get all products from MongoDB
// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Get a specific product by ID from MongoDB
// app.get('/api/products/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findById(productId);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ error: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Create a new product and save it to MongoDB
// app.post('/api/products', async (req, res) => {
//   const { name, description, price, state } = req.body;
//   try {
//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       state,
//     });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid product data' });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// const products = [
//     {
//       name: "Laptop",
//       price: 999.99,
//       category: "Electronics",
//       inStock: true
//     },
//     {
//       name: "Headphones",
//       price: 79.99,
//       category: "Electronics",
//       inStock: false
//     },
//     {
//       name: "Backpack",
//       price: 49.99,
//       category: "Fashion",
//       inStock: true
//     },
//     {
//       name: "Smartphone",
//       price: 699.99,
//       category: "Electronics",
//       inStock: true
//     },
//     {
//       name: "Running Shoes",
//       price: 89.99,
//       category: "Sports",
//       inStock: true
//     }
//   ];
  
  // console.log(products, "products are runing here 🏃");
  