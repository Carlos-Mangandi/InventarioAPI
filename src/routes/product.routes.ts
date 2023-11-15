import {} from 'express'
import { Router } from "express"
import ProductController from "../controllers/product.controller"

const router = Router()
const product = ProductController

router.post("/", product.createProduct)
router.get("/", product.getProducts)
router.get("/:id", product.byIdProduct)
router.delete("/:id", product.deleteProduct)
router.put("/:id", product.updateProduct)

export default router