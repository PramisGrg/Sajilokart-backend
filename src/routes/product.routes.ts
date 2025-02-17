import { Router } from "express";
import {
  createProductController,
  getAllProductsController,
  getSellerProductsController,
} from "../controllers/product.controller";
import { isSeller } from "../middlewares/role.middleware";
import upload from "../configs/multer.config";
import { uploadToProvider } from "../middlewares/asset.middleware";
import { validateToken } from "../middlewares/auth.middleware";

const productRouter = Router({ mergeParams: true });

productRouter.get("/", getAllProductsController);

productRouter.get("/seller-product", getSellerProductsController);

productRouter.post(
  "/create",
  validateToken,
  isSeller,
  upload.single("image"),
  uploadToProvider(),
  createProductController
);

export default productRouter;
