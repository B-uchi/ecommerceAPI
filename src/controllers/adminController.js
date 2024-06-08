import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const createProduct = async (req, res) => {
  const { name, price, description, image, featured, categories, colors } =
    req.body;

  if (
    !name ||
    !price ||
    !description ||
    !image ||
    !featured ||
    !categories ||
    !colors
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      image,
      featured,
      categories,
      colors,
    });
    const savedProduct = await newProduct.save();
    return res.status(201).json({ product: savedProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  if (!productId)
    return res.status(400).json({ message: "ProductID is required" });

  try {
    try {
      const product = await Product.deleteOne({ _id: new ObjectId(productId) });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const {
    productId,
    name,
    price,
    description,
    image,
    featured,
    categories,
    colors,
  } = req.body;

  if (!productId)
    return res.status(400).json({ message: "ProductID is required" });

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.featured = featured || product.featured;
    product.categories = categories || product.categories;
    product.colors = colors || product.colors;

    await product.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const featureProduct = async (req, res) => {
  const productId = req.params.productId;
  if (!productId)
    return res.status(400).json({ message: "ProductID is required" });

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.featured = !product.featured;
    await product.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchUsers = async (req, res) => {
  let users;
  const userId = req.params.userId;
  if (userId) {
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  try {
    users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchOrders = async (req, res) => {
  const orderId = req.params.orderId;
  let orders;
  if (orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  try {
    orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;
  if (!orderId || !status)
    return res.status(400).json({ message: "OrderID and status are required" });

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getIncome = async (req, res) => {
  try {
    const income = await Order.aggregate([
      { $match: { _id: { $exists: true } } },
      {
        $group: {
          _id: "$status",
          total_sales: { $sum: 1 },
          total_amount: { $sum: "$amount" },
        },
      },
    ]);

    return res.status(200).json({ income });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
