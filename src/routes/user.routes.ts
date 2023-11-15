import {} from 'express'
import { Router } from "express"
import UserController from "../controllers/user.controller"

const router = Router()
const user = UserController

router.post("/", user.createUser)
router.get("/", user.getUsers)
router.get("/:id", user.byIdUser)
router.delete("/:id", user.deleteUser)
router.put("/:id", user.updateUser)

export default router