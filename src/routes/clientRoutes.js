import { Router } from "express";
import { fetchCategories, fetchFeaturedProducts, fetchProduct, fetchProducts } from "../controllers/clientController.js";

const router = Router()

router.get("/fetchProducts", fetchProducts)
router.get("/fetchProduct/:productId", fetchProduct)
router.get("/fetchCategories", fetchCategories)
router.get("/fetchFeaturedProducts", fetchFeaturedProducts)

export default router;