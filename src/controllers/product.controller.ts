import { Request, Response } from "express";

export const createProduct = (req: Request, res: Response) => {
  console.log(req.body);
  console.log("Create product controller is running");
};
