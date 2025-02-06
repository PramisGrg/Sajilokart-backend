import { NextFunction, response, Response } from "express";
import { createUserService, loginUserService } from "../services/auth.service";
import { TLoginUserSchema, TRegisterUserSchema } from "../schemas/auth.schema";

interface TCreateUserRequest {
  body: TRegisterUserSchema;
  imageUrl?: string;
}

interface TLoginUserRequest {
  body: TLoginUserSchema;
}

export const createUser = async (
  req: TCreateUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await createUserService(req.body, req.imageUrl);

    res
      .status(201)
      .json({ message: "User Successfully Created", data: response });
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (
  req: TLoginUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await loginUserService(req.body);
    res
      .status(201)
      .json({ message: "User logged in successful", data: response });
  } catch (error) {
    next(error);
  }
};
