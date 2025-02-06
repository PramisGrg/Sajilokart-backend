import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

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

  return res.status(400).json({
    message:
      error instanceof Error ? error.message : "An unknown error occurred",
  });
};
