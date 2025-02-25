import { Router } from "express";
import {
  createUserController,
  loginUserController,
} from "../controllers/auth.controller";
import { uploadToProvider } from "../middlewares/asset.middleware";
import upload from "../configs/multer.config";
import { validateBody } from "../middlewares/validateBody.middleware";
import { loginUserSchema, registerUserSchema } from "../schemas/auth.schema";

const authRouter = Router({ mergeParams: true });

authRouter.post(
  "/register",
  validateBody(registerUserSchema),
  upload.single("image"),
  uploadToProvider(),
  createUserController
);

authRouter.post("/login", validateBody(loginUserSchema), loginUserController);

export default authRouter;
