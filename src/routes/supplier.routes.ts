import {} from 'express'
import {Router} from 'express'
import ProveedorController from '../controllers/supplier.controller'

const router = Router()
const proveedor = ProveedorController

router.post("/", proveedor.createSupplier)
router.get('/', proveedor.getSuppliers)
router.get('/:id', proveedor.byIdSupplier)
router.delete('/:id', proveedor.deleteSupplier)
router.put('/:id', proveedor.updateSupplier)

export default router