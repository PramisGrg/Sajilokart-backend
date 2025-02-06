import { Router } from "express";
import userRouter from "./auth.routes";

const mainRouter = Router({ mergeParams: true });

mainRouter.use("/auth", userRouter);

export default mainRouter;
