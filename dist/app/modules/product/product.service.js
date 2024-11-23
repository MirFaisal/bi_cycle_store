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
exports.ProductService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
/**
 * @description This Service Function is used to get all products
 */
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find({ idDeleted: false });
    return products;
});
/**
 * @description This Service Function is used to create a new product
 */
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield product_model_1.default.create(product);
    return newProduct;
});
/**
 * @description This Service Function is used to update an existing product
 */
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield product_model_1.default.findOneAndUpdate({ _id: id }, payload);
    if (!updatedProduct) {
        return null;
    }
    return updatedProduct;
});
/**
 * @description This Service Function is used to mark a product as deleted by setting its `isDeleted` flag to true.
 */
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findByIdAndUpdate({ _id: id }, { isDeleted: true });
    if (!product) {
        return null;
    }
    return product;
});
/**
 * @description This Service Function is used to get a product by its id
 */
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findOne({ _id: id });
    return product;
});
/**
 * @description This Service Function is used to get all products that match the given search term
 * by name, brand or type. It uses regex to search for the term in a case insensitive manner.
 */
const getProductWithQuery = (serchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find({
        $or: [
            { name: { $regex: serchTerm, $options: 'i' } },
            { brand: { $regex: serchTerm, $options: 'i' } },
            { type: { $regex: serchTerm, $options: 'i' } },
        ],
    });
    if (products.length === 0) {
        return [];
    }
    return products;
});
exports.ProductService = {
    getAllProducts,
    createProduct,
    updateProduct,
    getProductById,
    deleteProduct,
    getProductWithQuery,
};
