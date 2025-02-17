import { NextFunction, Request, Response } from "express";
import { getUserService } from "../services/user.service";
import KnownError from "../utils/knownError.utils";

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
