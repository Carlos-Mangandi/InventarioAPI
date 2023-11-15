import {} from 'express'
import { Router } from "express"
import RoleController from "../controllers/role.controller"

const router = Router()
const role = RoleController

router.post("/", role.createRole)
router.get("/", role.getRoles)
router.get("/:id", role.byIdRole)
router.delete("/:id", role.deleteRole)
router.put("/:id", role.updateRole)

export default router