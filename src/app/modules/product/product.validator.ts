import { z } from 'zod';

const productZodSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Product name is required' })
    .max(30, { message: 'Product name must be less than 30 characters' }),
  brand: z.string().min(1, { message: 'Product brand is required' }),
  price: z
    .number()
    .positive({ message: 'Product price must be a positive number' }),
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
    required_error: 'Product type is required',
  }),
  description: z
    .string()
    .min(1, { message: 'Product description is required' })
    .max(500, {
      message: 'Product description must be less than 500 characters',
    }),
  quantity: z
    .number()
    .int({ message: 'Product quantity must be an integer' })
    .nonnegative({ message: 'Product quantity cannot be negative' }),
  inStock: z.boolean({
    required_error: 'Product inStock is required',
  }),
  isDeleted: z.boolean().optional(),
});

export default productZodSchema;
