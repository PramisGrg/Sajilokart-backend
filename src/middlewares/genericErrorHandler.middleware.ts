import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

/**
 * ! This is the function responsible for handling any unhandled errors in the app.
 */
export const genericErrorHandler = async (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<any> => {
  try {
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
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
