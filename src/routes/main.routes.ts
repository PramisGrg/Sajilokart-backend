import { Router } from "express";
import productRouter from "./product.routes";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";

const mainRouter = Router({ mergeParams: true });

mainRouter.use("/auth", authRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/user", userRouter);

export default mainRouter;
