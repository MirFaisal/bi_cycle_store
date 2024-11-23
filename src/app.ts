import cros from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { OrderRoutes } from './app/modules/order/order.route';
import { ProductRoutes } from './app/modules/product/product.route';
const app: Application = express();

// middlewares and parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cros());

/**
 * all routes
 */
// Product routes
app.use('/api/products', ProductRoutes);
// Order routes
app.use('/api/orders', OrderRoutes);

// uninknown route handler
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ sucess: false, message: 'Route not found' });
});

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ sucess: false, message: err.message });
});

export default app;
