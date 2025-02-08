import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware";
import { createProduct } from "../controllers/product.controller";
import { isBuyer, isSeller } from "../middlewares/role.middleware";

const productRouter = Router({ mergeParams: true });

productRouter.post("/create", isSeller, createProduct);

export default productRouter;
