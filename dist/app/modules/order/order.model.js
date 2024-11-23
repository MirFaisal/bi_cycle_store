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
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../product/product.model"));
const orderSchema = new mongoose_1.default.Schema({
    email: { type: String, required: [true, 'Email is required'] },
    product: { type: String, required: [true, 'Product is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    totalPrice: { type: Number, required: [true, 'Price is required'] },
}, { timestamps: true });
/**
 * @description Static method to check if a product is available in the desired quantity.
 * @param id - The id of the product to check.
 * @param payload - The quantity of the product to check.
 * @returns True if the product is available, false otherwise.
 */
orderSchema.statics.isAvailable = function (id, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_model_1.default.findById(id);
        if ((product === null || product === void 0 ? void 0 : product.inStock) && product.quantity >= payload) {
            return true;
        }
        return false;
    });
};
/**
 * @description Static method to check if a product exists in the database.
 * @param id - The id of the product to check.
 * @returns True if the product exists, false otherwise.
 */
orderSchema.statics.isExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_model_1.default.findById(id);
        if (product) {
            return true;
        }
        return false;
    });
};
/**
 * @description mongoose Middleware to update the quantity of the product in the database.
 * @param next - The next middleware function.
 */
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield product_model_1.default.findById(this.product);
            if ((product === null || product === void 0 ? void 0 : product.inStock) && product.quantity >= this.quantity) {
                product.quantity -= this.quantity;
                if (product.quantity === 0) {
                    product.inStock = false;
                }
                yield product.save();
                next();
            }
        }
        catch (error) {
            next(error);
        }
    });
});
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
