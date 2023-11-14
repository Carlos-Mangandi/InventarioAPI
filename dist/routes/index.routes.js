"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const producto_routes_1 = __importDefault(require("./producto.routes"));
const proveedor_routes_1 = __importDefault(require("./proveedor.routes"));
dotenv_1.default.config();
const URL = process.env.url;
const routes = (0, express_1.Router)();
routes.use(`${URL}/proveedor`, proveedor_routes_1.default);
routes.use(`${URL}/producto`, producto_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.routes.js.map