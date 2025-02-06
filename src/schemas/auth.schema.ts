import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "enter a valid password"),
});

export const registerUserSchema = z.object({
  name: z.string().min(3, "enter a valid name"),
  email: z.string().email({ message: "email is required" }),
  phoneNumber: z.string().min(4, "enter a valid number"),
  password: z.string().min(3, "enter a valid password"),
  role: z.string({ message: "role is required" }),
});

export type TLoginUserSchema = z.infer<typeof loginUserSchema>;
export type TRegisterUserSchema = z.infer<typeof registerUserSchema>;
