import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { uploadToProvider } from "../middlewares/asset.middleware";
import upload from "../configs/multer.config";
import { validateBody } from "../middlewares/validateBody.middleware";
import { registerUserSchema } from "../schemas/auth.schema";

const userRouter = Router({ mergeParams: true });

userRouter.post(
  "/create",
  upload.single("image"),
  uploadToProvider(),
  validateBody(registerUserSchema),
  createUser
);

export default userRouter;
