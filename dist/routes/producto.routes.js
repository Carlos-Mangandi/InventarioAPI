"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = __importDefault(require("../controllers/producto.controller"));
const router = (0, express_1.Router)();
const product = producto_controller_1.default;
router.post("/", product.createProducto);
router.get("/", product.getProductos);
router.get("/:id", product.byIdProducto);
router.delete("/:id", product.deleteProducto);
router.put("/:id", product.updateProducto);
exports.default = router;
//# sourceMappingURL=producto.routes.js.map