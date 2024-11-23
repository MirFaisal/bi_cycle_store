"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productZodSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, { message: 'Product name is required' })
        .max(30, { message: 'Product name must be less than 30 characters' }),
    brand: zod_1.z.string().min(1, { message: 'Product brand is required' }),
    price: zod_1.z
        .number()
        .positive({ message: 'Product price must be a positive number' }),
    type: zod_1.z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
        required_error: 'Product type is required',
    }),
    description: zod_1.z
        .string()
        .min(1, { message: 'Product description is required' })
        .max(500, {
        message: 'Product description must be less than 500 characters',
    }),
    quantity: zod_1.z
        .number()
        .int({ message: 'Product quantity must be an integer' })
        .nonnegative({ message: 'Product quantity cannot be negative' }),
    inStock: zod_1.z.boolean({
        required_error: 'Product inStock is required',
    }),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.default = productZodSchema;
