import { Request, Response } from 'express';
import { z } from 'zod';
import Order from './order.model';
import { OrderService } from './order.service';
import orderZodSchema from './order.validator';

/**
 * @description this API is used to create a new order
 */

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = orderZodSchema.parse(req.body);
    const isExists = await Order.isExists(validatedData.product);
    if (!isExists) {
      res.status(400).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }
    const isAvailable = await Order.isAvailable(
      validatedData.product,
      validatedData.quantity,
    );
    if (!isAvailable) {
      res.status(400).json({
        success: false,
        message: 'Product is not available in sufficient quantity',
      });
      return;
    }

    const order = await OrderService.createOrder(validatedData);

    res.status(201).json({
      success: true,
      message: 'Successfully created an order',
      data: order,
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
 * @description This API is used to calculate the total revenue of all orders
 */
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await OrderService.calculateRevenue();
    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: revenue,
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'Somthing went wrong', error });
  }
};

export const orderController = { createOrder, calculateRevenue };
