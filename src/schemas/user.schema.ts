import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(3, "enter a valid name"),
  email: z.string().email({ message: "email is required" }),
  phoneNumber: z.string().min(4, "enter a valid number"),
});

export type TUpdateUserSchema = z.infer<typeof updateUserSchema>;
