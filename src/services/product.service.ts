import prisma from "../configs/db.config";
import { TProductSchema } from "../schemas/product.schema";
import KnownError from "../utils/knownError.utils";

export const createProductService = async (
  data: TProductSchema,
  sellerId: string,
  imageUrl: string | undefined
) => {
  const createProduct = await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      stock: data.stock,
      description: data.description,
      sellerId: sellerId,
      image: imageUrl,
    },
  });

  if (!createProduct) throw new KnownError("Failed to create new product");

  return createProduct;
};

export const getAllProductsService = () => {
  const allProducts = prisma.product.findMany();

  if (!allProducts) throw new KnownError("Error while fetching products");

  return allProducts;
};

export const getSellerProductService = (sellerId: string) => {
  const sellerProducts = prisma.product.findMany({
    where: {
      sellerId,
    },
  });

  if (!sellerProducts)
    throw new KnownError("Requested seller products not found");

  return sellerProducts;
};

export const getProductByIdService = (productId: string) => {
  const productById = prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!productById) throw new KnownError("Requested product not found");

  return productById;
};
