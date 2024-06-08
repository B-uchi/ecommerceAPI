import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { verifyToken } from "../middleware/middleware.js";
import { userCacheMiddleware } from "../middleware/userCacheMiddleware.js";
import {
  addToCart,
  checkout,
  clearCart,
  fetchOrders,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../controllers/userController.js";

const router = Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);

router.put("/addToCart", verifyToken, userCacheMiddleware, addToCart);
router.delete(
  "/removeFromCart",
  verifyToken,
  userCacheMiddleware,
  removeFromCart
);
router.put("/updateQuantity", verifyToken, userCacheMiddleware, updateQuantity);
router.get("/getCart", verifyToken, userCacheMiddleware, getCart);
router.delete("/clearCart", verifyToken, userCacheMiddleware, clearCart);
router.post("/checkout", verifyToken, userCacheMiddleware, checkout);
router.get("/fetchOrders", verifyToken, userCacheMiddleware, fetchOrders);

export default router;
