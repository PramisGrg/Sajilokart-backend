import { NextFunction, Request, Response } from "express";
import { getUserService, updateUserService } from "../services/user.service";
import KnownError from "../utils/knownError.utils";

interface TUserUpdateRequest extends Request {
  imageUrl?: string;
}

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.currentUser.id)
      throw new KnownError("User id doesn't exists, please login in ");

    const response = await getUserService(req.currentUser.id);

    return res
      .status(201)
      .json({ message: "User data successfully fetched", data: response });
  } catch (error) {
    return next(error);
  }
};

export const updateUserController = async (
  req: TUserUpdateRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.currentUser.id)
      throw new KnownError("Please login to perform this action");

    const response = await updateUserService(
      req.body,
      req.currentUser.id,
      req.imageUrl
    );

    return res
      .status(201)
      .json({ message: "User successfully updated", data: response });
  } catch (error) {
    return next(error);
  }
};
