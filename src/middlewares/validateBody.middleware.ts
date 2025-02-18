import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parseResult = await schema.parse(req.body);
      req.body = parseResult;
      return next();
    } catch (error) {
      next(error);
    }
  };
};
