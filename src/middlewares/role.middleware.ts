import { Response, Request, NextFunction } from "express";
import KnownError from "../utils/knownError.utils";
import prisma from "../configs/db.config";

export const isBuyer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = req.currentUser.role;

    if (!role)
      throw new KnownError("Please assign role to access this endpoints");

    if (role != "BUYER")
      throw new KnownError("Unable to access this endpoints");

    const validUser = await prisma.user.findFirst({
      where: {
        id: req.currentUser.id,
      },
    });

    if (!validUser) throw new KnownError("Invalid Credentails");

    return next();
  } catch (error) {
    return next(error);
  }
};

export const isSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = req.currentUser.role;

    if (!role)
      throw new KnownError("Please assign role to access this endpoints");

    if (role != "SELLER")
      throw new KnownError("Unable to access this endpoints");

    const validUser = await prisma.user.findFirst({
      where: {
        id: req.currentUser.id,
      },
    });

    if (!validUser) throw new KnownError("Invalid Credentails");

    return next();
  } catch (error) {
    return next(error);
  }
};
