import { Router } from "express";
import {
  createUserController,
  loginUserController,
} from "../controllers/auth.controller";
import { uploadToProvider } from "../middlewares/asset.middleware";
import upload from "../configs/multer.config";
import { validateBody } from "../middlewares/validateBody.middleware";
import { loginUserSchema, registerUserSchema } from "../schemas/auth.schema";

const userRouter = Router({ mergeParams: true });

userRouter.post(
  "/register",
  upload.single("image"),
  uploadToProvider(),
  validateBody(registerUserSchema),
  createUserController
);

userRouter.post("/login", validateBody(loginUserSchema), loginUserController);

export default userRouter;
