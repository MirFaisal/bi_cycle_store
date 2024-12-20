"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderZodSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    product: zod_1.z.string({ required_error: 'Product is required' }),
    quantity: zod_1.z
        .number({ required_error: 'Quantity is required' })
        .min(1, { message: 'Quantity must be at least 1' }),
    totalPrice: zod_1.z
        .number({ required_error: 'Price is required' })
        .positive({ message: 'Price must be a positive number' }),
});
exports.default = orderZodSchema;
