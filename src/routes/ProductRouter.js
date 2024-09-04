const express = require("express");
const productController = require("../controllers/ProductController");
const router = express.Router();

router.post("/create-product", productController.createProduct);
router.put("/update-product/:id", productController.updateProduct);
router.delete("/delete-product/:id", productController.deleteProduct);
router.get("/get-all-products", productController.getAllProducts);
router.get("/get-detail-product/:id", productController.getDetailProduct);

module.exports = router;
