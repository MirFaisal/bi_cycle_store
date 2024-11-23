import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.get('/', productController.allProducts);

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

router.get('/:id', productController.getProductById);

export const ProductRoutes = router;
