"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedor_controller_1 = __importDefault(require("../controllers/proveedor.controller"));
const router = (0, express_1.Router)();
const proveedor = proveedor_controller_1.default;
router.post("/", proveedor.createProveedor);
router.get('/', proveedor.getProveedores);
router.get('/:id', proveedor.byIdProveedor);
router.delete('/:id', proveedor.deleteProveedor);
router.put('/:id', proveedor.updateProveedor);
exports.default = router;
//# sourceMappingURL=proveedor.routes.js.map