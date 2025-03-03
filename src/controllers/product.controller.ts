import { NextFunction, Request, Response } from "express";
import { TProductSchema } from "../schemas/product.schema";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  getSellerProductService,
} from "../services/product.service";
import { date } from "zod";

export interface TCreateProductRequest extends Request {
  body: TProductSchema;
  imageUrl?: string;
}

export const createProductController = async (
  req: TCreateProductRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    console.log(req.currentUser.id);
    const response = await createProductService(
      req.body,
      req.currentUser.id,
      req.imageUrl
    );

    return res
      .status(201)
      .json({ message: "Product successfully created", data: response });
  } catch (error) {
    return next(error);
  }
};

export const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const response = await getAllProductsService();
    return res
      .status(201)
      .json({ message: "All products fetched successfully", data: response });
  } catch (error) {
    return next(error);
  }
};

export const getSellerProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getSellerProductService(req.currentUser.id);

    res.status(201).json({
      message: "Seller products fetched successfully",
      data: response,
    });
  } catch (error) {
    return next(error);
  }
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { productId } = req.params;
    const response = await getProductByIdService(productId);

    return res.status(201).json({
      message: "Product details fetched successfully",
      data: response,
    });
  } catch (error) {
    return next(error);
  }
};
