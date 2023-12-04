const express = require('express');
const router = express.Router();
const productControler = require("../controller/productController");


router.get("/products", productControler.getProducts);
router.get("/products/:id", productControler.getProductById);
router.post("/products", productControler.createProduct);
router.patch("/products/:id", productControler.updateProduct);
router.delete("/products/:id", productControler.deleteProduct);


module.exports = router;
