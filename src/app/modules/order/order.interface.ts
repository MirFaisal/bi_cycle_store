import { Model } from 'mongoose';

export interface IOrder {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
}

/**
 * @description This interface is used to add any additional static methods for the OrderModel interface
 */
export interface OrderModel extends Model<IOrder> {
  isAvailable: (id: string, payload: number) => Promise<boolean>;
  isExists: (id: string) => Promise<boolean>;
}
