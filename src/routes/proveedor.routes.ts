import {} from 'express'
import {Router} from 'express'
import ProveedorController from '../controllers/proveedor.controller'

const router = Router()
const proveedor = ProveedorController

router.post("/", proveedor.createProveedor)
router.get('/', proveedor.getProveedores)
router.get('/:id', proveedor.byIdProveedor)
router.delete('/:id', proveedor.deleteProveedor)
router.put('/:id', proveedor.updateProveedor)

export default router