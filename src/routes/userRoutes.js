import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { verifyToken } from "../middleware/middleware.js";
import userCacheMiddleware from "../middleware/userCacheMiddleware.js";
import { addToCart, removeFromCart } from "../controllers/userController.js";

const router = Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);

router.put("/addToCart", verifyToken, userCacheMiddleware, addToCart);
router.put("/removeFromCart", verifyToken, userCacheMiddleware, removeFromCart);

export default router;
