import { SaleDetail } from '../models/SaleDetails';
import {} from 'express'
import { Router } from "express"
import SaleDetailController from "../controllers/saleDetails.controller"

const router = Router()
const details = SaleDetailController

router.post("/", details.createDetail)
router.get("/", details.getDetails)
// router.get("/:id", details.byIdDetail)
// router.delete("/:id", details.deleteDetail)
// router.put("/:id", details.updateDetail)

export default router