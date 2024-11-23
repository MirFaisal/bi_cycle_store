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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const zod_1 = require("zod");
const order_model_1 = __importDefault(require("./order.model"));
const order_service_1 = require("./order.service");
const order_validator_1 = __importDefault(require("./order.validator"));
/**
 * @description this API is used to create a new order
 */
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = order_validator_1.default.parse(req.body);
        const isExists = yield order_model_1.default.isExists(validatedData.product);
        if (!isExists) {
            res.status(400).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }
        const isAvailable = yield order_model_1.default.isAvailable(validatedData.product, validatedData.quantity);
        if (!isAvailable) {
            res.status(400).json({
                success: false,
                message: 'Product is not available in sufficient quantity',
            });
            return;
        }
        const order = yield order_service_1.OrderService.createOrder(validatedData);
        res.status(201).json({
            success: true,
            message: 'Successfully created an order',
            data: order,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const stack = new Error().stack;
            res.status(404).json({
                success: false,
                message: 'Invalid request body',
                error,
                stack,
            });
        }
    }
});
/**
 * @description This API is used to calculate the total revenue of all orders
 */
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenue = yield order_service_1.OrderService.calculateRevenue();
        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: revenue,
        });
    }
    catch (error) {
        res
            .status(404)
            .json({ success: false, message: 'Somthing went wrong', error });
    }
});
exports.orderController = { createOrder, calculateRevenue };
