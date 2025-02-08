import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware";
import { createProduct } from "../controllers/product.controller";

const productRouter = Router({ mergeParams: true });

productRouter.post("/create", validateToken, createProduct);

export default productRouter;
