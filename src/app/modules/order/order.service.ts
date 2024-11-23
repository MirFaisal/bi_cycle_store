import { IOrder } from './order.interface';
import Order from './order.model';

/**
 * @description This service Function is used tro create a new order
 */
const createOrder = async (orderData: IOrder): Promise<IOrder> => {
  const order = await Order.create(orderData);
  return order;
};

/**
 * @description This service Function is used to calculate the total revenue of all orders
 */
const calculateRevenue = async (): Promise<object> => {
  const revenue = await Order.aggregate([
    //stage 1
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$price' },
      },
    },
    //stage 2
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  return revenue;
};

export const OrderService = { createOrder, calculateRevenue };
