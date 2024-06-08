import { Router } from "express";
import { verifyToken } from "../middleware/middleware.js";
import {
  checkAdminMiddleware,
  userCacheMiddleware,
} from "../middleware/userCacheMiddleware.js";
import {
  createProduct,
  deleteProduct,
  featureProduct,
  fetchOrders,
  fetchUsers,
  getIncome,
  updateOrderStatus,
  updateProduct,
} from "../controllers/adminController.js";

const router = Router();

router.post(
  "/createProduct",
  verifyToken,
  userCacheMiddleware,
  checkAdminMiddleware,
  createProduct
);
router.put(
  "/updateProduct/:productId",
  verifyToken,
  userCacheMiddleware,
  checkAdminMiddleware,
  updateProduct
);
router.delete(
  "/deleteProduct/:productId",
  verifyToken,
  userCacheMiddleware,
  checkAdminMiddleware,
  deleteProduct
);
router.put(
  "/featureProduct/:productId",
  verifyToken,
  userCacheMiddleware,
  checkAdminMiddleware,
  featureProduct
);
router.get(
  "/fetchUsers",
  verifyToken,
  userCacheMiddleware,
  checkAdminMiddleware,
  fetchUsers
);
router.get(
  "/fetchUser/:userId",
  verifyToken,
  userCacheMiddleware,
  checkAdminMiddleware,
  fetchUsers
);
router.get(
  "/fetchOrders",
  verifyToken,
  userCacheMiddleware,
  checkAdminMiddleware,
  fetchOrders
);
router.get(
  "/fetchOrder/:orderId",
  verifyToken,
  userCacheMiddleware,
  checkAdminMiddleware,
  fetchOrders
);
router.put(
  "/updateOrder/:orderId",
  verifyToken,
  userCacheMiddleware,
  checkAdminMiddleware,
  updateOrderStatus
);
router.get('/getIncome', verifyToken, userCacheMiddleware, checkAdminMiddleware, getIncome)

export default router;
