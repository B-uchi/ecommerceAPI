import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  const userID = req.userID;
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: "Invalid request" });
  try {
    const userCart = await Cart.findOne({ userId: userID });
    if (!userCart) {
      const newCart = new Cart({
        userId: userID,
        products: [{ productId, quantity: 1 }],
      });
      newCart.save();
      return res.sendStatus(200);
    } else {
      await Cart.updateOne(
        { userId: userID },
        {
          $set: {
            products: {
              productId,
              quantity: 1,
            },
          },
        },
        { upsert: true }
      );

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
    try {
      await Cart.updateOne(
        { userId: userID },
        { $pull: { products: { productId } } }
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
}

export const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userID = req.userID;

  if (!productId || !quantity)
    return res.status(400).json({ message: "Invalid request" });

  try {
    const userCart = await Cart.findOne({ userId: userID });
    if (!userCart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = userCart.products.findIndex(
      (product) => product.productId === productId
    );
    if (productIndex === -1)
      return res.status(400).json({ message: "Product not found" });

    userCart.products[productIndex].quantity = quantity;
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
