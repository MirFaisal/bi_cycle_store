import mongoose from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      maxlength: [30, 'Product name must be less than 30 characters'],
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
    },
    type: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: [true, 'Product type is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [500, 'Product description must be less than 500 characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Product inStock is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
