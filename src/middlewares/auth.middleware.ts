import { config } from "dotenv";
config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TRegisterUserSchema } from "../schemas/auth.schema";
import KnownError from "../utils/knownError.utils";

interface JWTPayload extends TRegisterUserSchema {
  id: string;
  image: string;
}
declare global {
  namespace Express {
    interface Request {
      currentUser: JWTPayload;
    }
  }
}

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");

    if (!token)
      throw new KnownError(
        "You're not logged in, please login in and try again"
      );

    const [tokenType, tokenValue] = token.split(" ");

    if (tokenType != "Bearer")
      throw new KnownError("Sorry, the login method is not valid here");

    const userData = jwt.verify(
      tokenValue,
      process.env.JWT_SECRET ?? "jwtSecret"
    ) as JWTPayload;

    console.log(userData, "This is user data");

    req.currentUser = userData;

    return next();
  } catch (error) {
    return next(error);
  }
};
