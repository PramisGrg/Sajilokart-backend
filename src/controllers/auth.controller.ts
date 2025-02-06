import { NextFunction, Response } from "express";
import { createUserService } from "../services/auth.service";
import { TRegisterUserSchema } from "../schemas/auth.schema";

interface TCreateUserRequest {
  body: TRegisterUserSchema;
  imageUrl?: string;
}

export const createUser = async (
  req: TCreateUserRequest,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);

  try {
    const response = await createUserService(req.body, req.imageUrl);

    res
      .status(201)
      .json({ message: "User Successfully Created", data: response });
  } catch (error) {
    return next(error);
  }
};
