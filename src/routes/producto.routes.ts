import {} from 'express'
import { Router } from "express"
import ProductoController from "../controllers/producto.controller"

const router = Router()
const product = ProductoController

router.post("/", product.createProducto)
router.get("/", product.getProductos)
router.get("/:id", product.byIdProducto)
router.delete("/:id", product.deleteProducto)
router.put("/:id", product.updateProducto)

export default router