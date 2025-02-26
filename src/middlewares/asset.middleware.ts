import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";

interface SecureRequest extends Request {
  imageUrl?: string;
  file?: Express.Multer.File;
}

export function uploadToProvider() {
  return async (
    req: SecureRequest,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.file?.buffer) {
        return next();
      }

      const file = req.file;

      //Upload image to cloudinary
      const imageUrl = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error || !result) {
              return reject(new Error("Failed to upload image to Cloudinary"));
            }
            resolve(result.secure_url);
          }
        );
        stream.end(file.buffer);
      });

      req.imageUrl = imageUrl;

      next();
    } catch (error) {
      next(error);
    }
  };
}
