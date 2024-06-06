import Product from "../models/Product.js";

export const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchProduct = async (req, res) => {
  const productId = req.params.productId;
  if (!productId)
    return res.status(400).json({ message: "ProductID is required" });

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchCategories = async (req, res) => {
  try {
    const categories = await Product.find().distinct("categories");
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

