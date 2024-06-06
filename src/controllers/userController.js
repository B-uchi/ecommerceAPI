import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  const userID = req.userID;
  const { productID, quantity } = req.body;
  try {
    const userCart = await Cart.findOne({ userId: userID });
    if (!userCart) {
      const newCart = new Cart({ userId: userID, products: [{ productID, quantity }] });
      newCart.save();
      return res.sendStatus(200);
    }
    userCart.products.push({ productID, quantity});
    userCart.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
