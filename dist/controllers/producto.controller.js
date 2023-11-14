"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Producto_1 = require("../models/Producto");
const Proveedor_1 = require("../models/Proveedor");
const typeorm_1 = require("typeorm");
const productoRepository = data_source_1.AppDataSource
    .getRepository("Producto");
class ProductoController {
}
_a = ProductoController;
//FUNCIONA
ProductoController.createProducto = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock, proveedorId } = req.body;
    const proveedorRepository = data_source_1.AppDataSource.getRepository(Proveedor_1.Proveedor);
    let existingProveedor;
    try {
        if (proveedorId) {
            existingProveedor = yield proveedorRepository.findOne({ where: { id: proveedorId } });
            if (!existingProveedor) {
                return resp.json({
                    ok: false,
                    msg: `Role whit ID '${proveedorId} does not exist`
                });
            }
        }
        else {
            if ((existingProveedor === null || existingProveedor === void 0 ? void 0 : existingProveedor.rol) && proveedorId) {
                return resp.json({
                    ok: false,
                    msg: 'Cannot assign supplier to a regular product'
                });
            }
        }
        const product = new Producto_1.Producto();
        product.name = name,
            product.description = description,
            product.price = price,
            product.stock = stock,
            product.proveedor = existingProveedor;
        yield productoRepository.save(product);
        return resp.json({
            ok: true,
            STATUS_CODE: 200,
            message: 'Product was create with successfully'
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            message: `error = ${error.message}`
        });
    }
});
//FUNCIONA
ProductoController.getProductos = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    console.log(req.query);
    try {
        const products = yield productoRepository.find({
            where: { state: true, proveedor: (0, typeorm_1.Like)(`%${name}%`) }
        });
        return products.length > 0
            ? resp.json({
                ok: true,
                message: 'list of products', products
            }) : resp.json({ ok: false, message: 'Not found', products });
    }
    catch (error) {
        return resp.json({
            ok: false,
            message: `error = ${error.message}`
        });
    }
});
//FUNCIONA
ProductoController.byIdProducto = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const product = yield productoRepository.findOne({
            where: { id, state: true }
        });
        return product
            ? resp.json({
                ok: true, product
            }) : resp.json({ ok: false, message: "The id don't exist"
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            message: `error = ${error.message}`
        });
    }
});
// FUNCIONA
ProductoController.deleteProducto = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const product = yield productoRepository.findOne({
            where: { id, state: true }
        });
        if (!product) {
            throw new Error("Not fund");
        }
        product.state = false;
        yield productoRepository.save(product);
        return resp.json({
            ok: true,
            message: "Product was delete"
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            message: `error => ${error.message}`
        });
    }
});
// FUNCIONA
ProductoController.updateProducto = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { stock } = req.body;
    try {
        const product = yield productoRepository.findOne({
            where: { id, state: true },
        });
        if (!stock) {
            throw new Error('Not Fund');
        }
        product.stock = stock;
        yield productoRepository.save(product);
        return resp.json({
            ok: true,
            STATUS_CODE: 200,
            message: 'Product was updated', product
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error = ${error.message}`
        });
    }
});
exports.default = ProductoController;
//# sourceMappingURL=producto.controller.js.map