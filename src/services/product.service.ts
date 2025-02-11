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

// export const getAllProductsService = (sellerId: string) => {
//   const allProducts = prisma.product.findMany({
//     where: {
//       sellerId,
//     },
//   });

//   if (!allProducts) throw new KnownError("Error while fetching products");

//   return allProducts;
// };

export const getAllProductsService = () => {
  const allProducts = prisma.product.findMany();

  if (!allProducts) throw new KnownError("Error while fetching products");

  return allProducts;
};

export const getSellerProductService = (sellerId: string) => {
  const buyerProducts = prisma.product.findMany({
    where: {
      sellerId,
    },
  });

  if (!buyerProducts)
    throw new KnownError("Error while fetching seller products");

  return buyerProducts;
};
