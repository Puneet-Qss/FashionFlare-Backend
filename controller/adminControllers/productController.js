const Product = require("../../models/admin/productSchema");

// Function to create a new product
createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Function to get all products
getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const allProductsByClientId = async (req, res) => {
  try {
    const { client_id } = req.body;
    console.log("REEEE", req?.body);
    const products = await Product.find({ client_id });
    console.log("REEEE", products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  allProductsByClientId,
  getAllProducts,
};
