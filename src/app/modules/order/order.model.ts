import mongoose from 'mongoose';
import Product from '../product/product.model';
import { IOrder, OrderModel } from './order.interface';

const orderSchema = new mongoose.Schema<IOrder, OrderModel>(
  {
    email: { type: String, required: [true, 'Email is required'] },
    product: { type: String, required: [true, 'Product is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
  },
  { timestamps: true },
);

/**
 * @description Static method to check if a product is available in the desired quantity.
 * @param id - The id of the product to check.
 * @param payload - The quantity of the product to check.
 * @returns True if the product is available, false otherwise.
 */
orderSchema.statics.isAvailable = async function (id: string, payload: number) {
  const product = await Product.findById(id);
  if (product?.inStock && product.quantity >= payload) {
    return true;
  }
  return false;
};

/**
 * @description Static method to check if a product exists in the database.
 * @param id - The id of the product to check.
 * @returns True if the product exists, false otherwise.
 */
orderSchema.statics.isExists = async function (id: string) {
  const product = await Product.findById(id);
  if (product) {
    return true;
  }
  return false;
};

/**
 * @description mongoose Middleware to update the quantity of the product in the database.
 * @param next - The next middleware function.
 */
orderSchema.pre('save', async function (next) {
  try {
    const product = await Product.findById(this.product);
    if (product?.inStock && product.quantity >= this.quantity) {
      product.quantity -= this.quantity;
      if (product.quantity === 0) {
        product.inStock = false;
      }
      await product.save();
      next();
    }
  } catch (error: any) {
    next(error);
  }
});

const Order = mongoose.model<IOrder, OrderModel>('Order', orderSchema);

export default Order;
