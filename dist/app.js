"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const order_route_1 = require("./app/modules/order/order.route");
const product_route_1 = require("./app/modules/product/product.route");
const app = (0, express_1.default)();
// middlewares and parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
/**
 * all routes
 */
// Product routes
app.use('/api/products', product_route_1.ProductRoutes);
// Order routes
app.use('/api/orders', order_route_1.OrderRoutes);
// uninknown route handler
app.all('*', (req, res) => {
    res.status(404).json({ sucess: false, message: 'Route not found' });
});
// global error handler
app.use((err, req, res, next) => {
    res.status(500).json({ sucess: false, message: err.message });
});
exports.default = app;
