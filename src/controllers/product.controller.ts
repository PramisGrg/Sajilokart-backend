import { NextFunction, Request, Response } from "express";
import { TProductSchema } from "../schemas/product.schema";
import { createProductService } from "../services/product.service";

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
