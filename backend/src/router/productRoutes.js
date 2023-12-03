const express = require('express');
const router = express.Router();
const productControler = require("../controllers/productController");


router.get("/products", productControler.getProducts);
router.get("/products/:id", productControler.getProductById);
router.post("/products/:id", productControler.createProduct);


export default router;
