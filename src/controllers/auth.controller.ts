import { NextFunction, Response } from "express";
import { createUserService, loginUserService } from "../services/auth.service";
import { TLoginUserSchema, TRegisterUserSchema } from "../schemas/auth.schema";

interface TCreateUserRequest {
  body: TRegisterUserSchema;
  imageUrl?: string;
}

interface TLoginUserRequest {
  body: TLoginUserSchema;
}

//Create user registration
export const createUserController = async (
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

//login user controller
export const loginUserController = async (
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
    console.log("This is error form login in controller");
    return next(error);
  }
};
