import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import KnownError from "../utils/knownError.utlis";

export const genericErrorHandler = async (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<any> => {
  console.log(error);
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (error instanceof KnownError) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({ message: "Something went wrong!" });
};
