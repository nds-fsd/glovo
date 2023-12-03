const { Product } = require("../schema");




// Get all products from MongoDB
exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Get a specific product by ID from MongoDB
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Create a new product and save it to MongoDB
exports.createProduct = async (req, res) => {
    const { name, description, price, state } = req.body;
    try {
      const newProduct = new Product({
        name,
        description,
        price,
        state,
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: 'Invalid product data' });
    }
  };