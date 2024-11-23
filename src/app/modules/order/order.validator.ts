import { z } from 'zod';

const orderZodSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),
  product: z.string().nonempty({ message: 'Product is required' }),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .min(1, { message: 'Quantity must be at least 1' }),
  price: z
    .number({ required_error: 'Price is required' })
    .positive({ message: 'Price must be a positive number' }),
});

export default orderZodSchema;
