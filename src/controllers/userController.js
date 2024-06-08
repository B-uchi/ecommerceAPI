import { ObjectId } from "mongodb";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  const userID = req.userID;
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: "Invalid request" });
  try {
    const userCart = await Cart.findOne({ userId: userID });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!userCart) {
      const newCart = new Cart({
        userId: userID,
        products: [{ productId, quantity: 1 }],
        amount: product.price,
      });
      newCart.save();
      return res.sendStatus(200);
    } else {
      if (
        userCart.products.findIndex(
          (product) => product.productId.toString() === productId
        ) === -1
      ) {
        userCart.products.push({ productId, quantity: 1 });
        userCart.amount += product.price;
        await userCart.save();
      } else {
        return res.status(400).json({ message: "Product already in cart" });
      }

      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userID = req.userID;

  if (!productId) return res.status(400).json({ message: "Invalid request" });

  try {
    const product = await Product.findById(productId);
    const userCart = await Cart.findOne({ userId: userID });
    try {
      await Cart.updateOne(
        { userId: userID },
        {
          $pull: {
            products: { productId },
            $set: { amount: userCart.amount - product.price },
          },
        }
      );
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({ message: "Item not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  const userID = req.userID;
  try {
    const userCart = await Cart.findOne({ userId: userID });
    if (!userCart) return res.status(404).json({ message: "Cart not found" });
    const cart = userCart.products;
    cart.forEach(async (product) => {
      const productDetails = await Product.findById(product.productId);
      product.productDetails = productDetails;
    });

    return cart;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userID = req.userID;

  if (!productId || !quantity)
    return res.status(400).json({ message: "Invalid request" });

  try {
    const product = await Product.findById(productId);
    const userCart = await Cart.findOne({ userId: userID });
    if (!userCart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = userCart.products.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (productIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

    userCart.products[productIndex].quantity = quantity;
    userCart.amount =
      userCart.amount - product.price + product.price * quantity;
    await userCart.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  const userID = req.userID;
  try {
    const cart = await Cart.findOne({ userId: userID });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = [];
    await cart.save();
    return res.status(200).json({ cart: cart.products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchOrders = async (req, res) => {
  const userId = req.userID;
  try {
    const orders = await Order.find({ userId });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const checkout = async (req, res) => {
  const userID = req.userID;
  const { address } = req.body;
  try {
    const userCart = await Cart.findOne({ userId: userID });

    if (!userCart) return res.status(404).json({ message: "Cart not found" });
    if (userCart.products == []){
      return res.status(400).json({message: 'Cannot checkout with empty cart'})
    }
    const products = userCart.products;

    const newOrder = new Order({
      userId: userID,
      products,
      amount: userCart.amount,
      address,
    });

    await newOrder.save();
    userCart.products = [];
    await userCart.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
