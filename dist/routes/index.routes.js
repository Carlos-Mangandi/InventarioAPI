"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const product_routes_1 = __importDefault(require("./product.routes"));
const supplier_routes_1 = __importDefault(require("./supplier.routes"));
const customer_routes_1 = __importDefault(require("./customer.routes"));
const sale_routes_1 = __importDefault(require("./sale.routes"));
const saleDetails_routes_1 = __importDefault(require("./saleDetails.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const role_routes_1 = __importDefault(require("./role.routes"));
dotenv_1.default.config();
const URL = process.env.url;
const routes = (0, express_1.Router)();
routes.use(`${URL}/supplier`, supplier_routes_1.default);
routes.use(`${URL}/product`, product_routes_1.default);
routes.use(`${URL}/customer`, customer_routes_1.default);
routes.use(`${URL}/sale`, sale_routes_1.default);
routes.use(`${URL}/details`, saleDetails_routes_1.default);
routes.use(`${URL}/user`, user_routes_1.default);
routes.use(`${URL}/role`, role_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.routes.js.map