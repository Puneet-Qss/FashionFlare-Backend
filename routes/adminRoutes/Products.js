const express = require("express");
const {
  createProduct,
  allProductsByClientId,
  getAllProducts,
} = require("../../controller/adminControllers/productController");
const router = express.Router();

router.post("/create-product", createProduct);
router.post("/all-products-by-client", allProductsByClientId);
router.get("/all-products", getAllProducts);

module.exports = router;
