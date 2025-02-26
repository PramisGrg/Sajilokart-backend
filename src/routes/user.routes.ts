import { Router } from "express";
import {
  getUserController,
  updateUserController,
} from "../controllers/user.controller";
import { validateToken } from "../middlewares/auth.middleware";
import upload from "../configs/multer.config";
import { uploadToProvider } from "../middlewares/asset.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { updateUserSchema } from "../schemas/user.schema";

const userRouter = Router({ mergeParams: true });

userRouter.get("/", validateToken, getUserController);
userRouter.post(
  "/update",
  validateToken,
  upload.single("image"),
  uploadToProvider(),
  validateBody(updateUserSchema),
  updateUserController
);

export default userRouter;
