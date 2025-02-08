import prisma from "../configs/db.config";
import { TCreateProductRequest } from "../controllers/product.controller";
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
