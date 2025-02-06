import { Router } from "express";
import userRouter from "./user.routes";

const mainRouter = Router({ mergeParams: true });

mainRouter.use("/user", userRouter);

export default mainRouter;
