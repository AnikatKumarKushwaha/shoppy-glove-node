import { Product } from "../models/product.model.js";

// Fetch all products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Fetch product by ID
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};
