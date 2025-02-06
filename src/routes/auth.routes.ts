import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controller";
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
  createUser
);

userRouter.post("/login", loginUser);

export default userRouter;
