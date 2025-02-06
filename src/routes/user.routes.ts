import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { uploadToProvider } from "../middlewares/asset.middleware";
import upload from "../configs/multer.config";

const userRouter = Router({ mergeParams: true });

userRouter.post(
  "/create",
  upload.single("image"),
  uploadToProvider(),
  createUser
);

export default userRouter;
