import { Request, Response } from "express";

export const createUser = (req: Request, res: Response) => {
  console.log(req.body, "This is request body");
  console.log("This is create User");
};
