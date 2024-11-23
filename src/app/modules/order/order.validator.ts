import { z } from 'zod';

const orderZodSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  product: z.string({ required_error: 'Product is required' }),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .min(1, { message: 'Quantity must be at least 1' }),
  totalPrice: z
    .number({ required_error: 'Price is required' })
    .positive({ message: 'Price must be a positive number' }),
});

export default orderZodSchema;
