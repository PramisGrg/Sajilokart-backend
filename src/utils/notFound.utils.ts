import { Request, Response } from "express";

export const NotFoundController = async (
  req: Request,
  res: Response
): Promise<any> => {
  return res
    .status(400)
    .json({ message: "Sorry, the requested content was not found in server " });
};
