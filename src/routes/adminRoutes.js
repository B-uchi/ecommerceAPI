import { Router } from "express";
import { verifyToken } from "../middleware/middleware.js";
import { checkAdminMiddleware, userCacheMiddleware } from "../middleware/userCacheMiddleware.js";
import { createProduct, deleteProduct, featureProduct, updateProduct } from "../controllers/adminController.js";

const router = Router()

router.post('/createProduct', verifyToken, userCacheMiddleware, checkAdminMiddleware, createProduct)
router.put('/updateProduct/:productId', verifyToken, userCacheMiddleware, checkAdminMiddleware, updateProduct)
router.delete('/deleteProduct/:productId', verifyToken, userCacheMiddleware, checkAdminMiddleware, deleteProduct)
router.put('/featureProduct/:productId', verifyToken, userCacheMiddleware, checkAdminMiddleware, featureProduct)

export default router;