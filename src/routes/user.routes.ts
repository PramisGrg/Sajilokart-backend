import { Router } from "express";
import { getUserController } from "../controllers/user.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { validateToken } from "../middlewares/auth.middleware";

const userRouter = Router({ mergeParams: true });

userRouter.get("/", validateToken, getUserController);

export default userRouter;
