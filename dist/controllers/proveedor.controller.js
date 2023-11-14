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
const Proveedor_1 = require("./../models/Proveedor");
const data_source_1 = require("../data-source");
const proveedorRepository = data_source_1.AppDataSource
    .getRepository("Proveedor");
class ProveedorController {
}
_a = ProveedorController;
ProveedorController.createProveedor = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, contact, direction, } = req.body;
    try {
        const proveedor = new Proveedor_1.Proveedor();
        proveedor.name = name,
            proveedor.contact = contact,
            proveedor.direction = direction;
        yield proveedorRepository.save(proveedor);
        return resp.json({ ok: true, STATUS_CODE: 200, message: 'Proveedor was create with successfully' });
    }
    catch (error) {
        return resp.json({ ok: false, STATUS_CODE: 500, message: `error = ${error.message}` });
    }
});
ProveedorController.getProveedores = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = yield proveedorRepository.find({ where: { state: true } });
        return proveedor.length > 0
            ? resp.json({ ok: true, proveedor }) : resp.json({ ok: false, msg: 'Not found' });
    }
    catch (error) {
        return resp.json({ ok: false, message: `error = ${error.message}` });
    }
});
ProveedorController.byIdProveedor = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const proveedor = yield proveedorRepository.findOne({ where: { id, state: true } });
        return proveedor ? resp.json({ ok: true, proveedor }) : resp.json({ ok: false, msg: "The id don´t exist" });
    }
    catch (error) {
        return resp.json({ ok: false, message: `error = ${error.message}` });
    }
});
ProveedorController.deleteProveedor = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const proveedor = yield proveedorRepository.findOne({ where: { id, state: true } });
        if (!proveedor) {
            throw new Error("Not fund");
        }
        proveedor.state = false;
        yield proveedorRepository.save(proveedor);
        return resp.json({ ok: true, msg: 'Proveedor was delete'
        });
    }
    catch (error) {
        return resp.json({ ok: false, message: `error = ${error.message}`
        });
    }
});
ProveedorController.updateProveedor = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, contact, direction } = req.body;
    try {
        const proveedor = yield proveedorRepository.findOne({ where: { id, state: true }, });
        if (!name) {
            throw new Error('Not Fund');
        }
        proveedor.name = name,
            proveedor.contact = contact,
            proveedor.direction = direction;
        yield proveedorRepository.save(proveedor);
        return resp.json({ ok: true, STATUS_CODE: 200, message: 'Proveedor was updated', proveedor });
    }
    catch (error) {
        return resp.json({ ok: false, STATUS_CODE: 500, message: `error = ${error.message}` });
    }
});
exports.default = ProveedorController;
//# sourceMappingURL=proveedor.controller.js.map