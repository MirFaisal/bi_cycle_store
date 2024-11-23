import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { ProductService } from './product.service';
import productZodSchema from './product.validator';

/**
 *@description This API is used to get all products
 */
const allProducts = async (req: Request, res: Response) => {
  try {
    if (req.query.searchTerm) {
      const products = await ProductService.getProductWithQuery(
        req.query.searchTerm as string,
      );

      if (products.length === 0) {
        res.status(200).json({
          success: true,
          message: 'No products found',
          data: products,
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Successfully fetched all products',
          data: products,
        });
      }
    } else {
      const products = await ProductService.getAllProducts();

      res.status(200).json({
        success: true,
        message: 'Successfully fetched all products',
        data: products,
      });
    }
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'Somthing went wrong', error });
  }
};

/**
 * @description This API is used to create a new product.
 */
const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = productZodSchema.parse(req.body);

    const product = await ProductService.createProduct(validatedData);

    res.status(201).json({
      success: true,
      message: 'Successfully created a product',
      data: product,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const stack = new Error().stack;
      res.status(404).json({
        success: false,
        message: 'Invalid request body',
        error,
        stack,
      });
    }
  }
};

/**
 * @description This API is used to update an existing product.
 */
const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ success: false, message: 'Invalid id' });
      return;
    }

    const validatedData = productZodSchema.parse(req.body);

    const product = await ProductService.updateProduct(id, validatedData);

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
    } else {
      res.status(200).json({
        success: true,
        message: 'Successfully updated a product',
        data: product,
      });
    }
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'Somthing went wrong', error });
  }
};

/**
 * @description This API is used to delete a product
 */
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ success: false, message: 'Invalid id' });
      return;
    }

    const product = await ProductService.deleteProduct(id);

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
    } else {
      res.status(200).json({
        success: true,
        message: 'Successfully deleted a product',
        data: product,
      });
    }
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'Somthing went wrong', error });
  }
};

/**
 * @description This API is used to get a product by its id
 */
const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ success: false, message: 'Invalid id' });
      return;
    }

    const product = await ProductService.getProductById(id);

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
    } else {
      res.status(200).json({
        success: true,
        message: 'Successfully fetched a product',
        data: product,
      });
    }
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'Somthing went wrong', error });
  }
};

export const productController = {
  allProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
