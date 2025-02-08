import { Router } from "express";
import userRouter from "./auth.routes";
import productRouter from "./product.routes";
import { validateToken } from "../middlewares/auth.middleware";

const mainRouter = Router({ mergeParams: true });

mainRouter.use("/auth", userRouter);
mainRouter.use("/product", productRouter);

export default mainRouter;
