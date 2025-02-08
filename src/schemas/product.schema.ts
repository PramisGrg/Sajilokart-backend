import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be a positive number"),
  description: z.string(),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  sellerId: z.string().uuid("Invalid seller ID format"),
  categories: z.array(z.string()),
});

export type TProductSchema = z.infer<typeof productSchema>;
