import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  image: z.string().url("Image must be a valid URL").optional(),
  sellerId: z.string().uuid("Invalid seller ID format"),
  categories: z.array(z.string()),
});

export type TProductSchema = z.infer<typeof productSchema>;
