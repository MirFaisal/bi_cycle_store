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
exports.productController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const product_service_1 = require("./product.service");
const product_validator_1 = __importDefault(require("./product.validator"));
/**
 *@description This API is used to get all products
 */
const allProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.searchTerm) {
            const products = yield product_service_1.ProductService.getProductWithQuery(req.query.searchTerm);
            if (products.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'No products found',
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: 'Successfully fetched all products',
                    data: products,
                });
            }
        }
        else {
            const products = yield product_service_1.ProductService.getAllProducts();
            res.status(200).json({
                success: true,
                message: 'Successfully fetched all products',
                data: products,
            });
        }
    }
    catch (error) {
        res
            .status(404)
            .json({ success: false, message: 'Somthing went wrong', error });
    }
});
/**
 * @description This API is used to create a new product.
 */
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = product_validator_1.default.parse(req.body);
        const product = yield product_service_1.ProductService.createProduct(validatedData);
        res.status(201).json({
            success: true,
            message: 'Successfully created a product',
            data: product,
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
            return;
        }
        res.status(500).json({
            success: false,
            message: 'Server Erroe',
            error,
        });
    }
});
/**
 * @description This API is used to update an existing product.
 */
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // check if id is valid
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(404).json({ success: false, message: 'Invalid id' });
            return;
        }
        const product = yield product_service_1.ProductService.updateProduct(id, req.body);
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Successfully updated a product',
                data: product,
            });
        }
    }
    catch (error) {
        res
            .status(404)
            .json({ success: false, message: 'Somthing went wrong', error });
    }
});
/**
 * @description This API is used to delete a product
 */
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // check if id is valid
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(404).json({ success: false, message: 'Invalid id' });
            return;
        }
        const product = yield product_service_1.ProductService.deleteProduct(id);
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Successfully deleted a product',
                data: product,
            });
        }
    }
    catch (error) {
        res
            .status(404)
            .json({ success: false, message: 'Somthing went wrong', error });
    }
});
/**
 * @description This API is used to get a product by its id
 */
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // check if id is valid
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(404).json({ success: false, message: 'Invalid id' });
            return;
        }
        const product = yield product_service_1.ProductService.getProductById(id);
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Successfully fetched a product',
                data: product,
            });
        }
    }
    catch (error) {
        res
            .status(404)
            .json({ success: false, message: 'Somthing went wrong', error });
    }
});
exports.productController = {
    allProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
};
