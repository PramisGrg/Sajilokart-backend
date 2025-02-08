import { Router } from "express";
import { createProductController } from "../controllers/product.controller";
import { isSeller } from "../middlewares/role.middleware";
import upload from "../configs/multer.config";
import { uploadToProvider } from "../middlewares/asset.middleware";

const productRouter = Router({ mergeParams: true });

productRouter.post(
  "/create",
  isSeller,
  upload.single("image"),
  uploadToProvider(),
  createProductController
);

export default productRouter;
