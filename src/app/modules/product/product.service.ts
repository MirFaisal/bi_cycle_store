import { IProduct } from './product.interface';
import Product from './product.model';

/**
 * @description This Service Function is used to get all products
 */
const getAllProducts = async (): Promise<IProduct[]> => {
  const products = await Product.find({ idDeleted: false });
  return products;
};
/**
 * @description This Service Function is used to create a new product
 */
const createProduct = async (product: IProduct): Promise<IProduct> => {
  const newProduct = await Product.create(product);
  return newProduct;
};

/**
 * @description This Service Function is used to update an existing product
 */
const updateProduct = async (
  id: string,
  payload: Partial<IProduct>,
): Promise<IProduct | null> => {
  const updatedProduct = await Product.findOneAndUpdate({ _id: id }, payload);

  if (!updatedProduct) {
    return null;
  }
  return updatedProduct;
};
/**
 * @description This Service Function is used to mark a product as deleted by setting its `isDeleted` flag to true.
 */
const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const product = await Product.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
  );
  if (!product) {
    return null;
  }
  return product;
};
/**
 * @description This Service Function is used to get a product by its id
 */
const getProductById = async (id: string): Promise<IProduct | null> => {
  const product = await Product.findOne({ _id: id });
  return product;
};
/**
 * @description This Service Function is used to get all products that match the given search term
 * by name, brand or type. It uses regex to search for the term in a case insensitive manner.
 */
const getProductWithQuery = async (serchTerm: string): Promise<IProduct[]> => {
  const products = await Product.find({
    $or: [
      { name: { $regex: serchTerm, $options: 'i' } },
      { brand: { $regex: serchTerm, $options: 'i' } },
      { type: { $regex: serchTerm, $options: 'i' } },
    ],
  });
  if (products.length === 0) {
    return [];
  }
  return products;
};

export const ProductService = {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  getProductWithQuery,
};
