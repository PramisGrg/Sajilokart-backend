import jwt from "jsonwebtoken";
import { TRegisterUserSchema } from "../schemas/auth.schema";

export function generateToken(payload: TRegisterUserSchema) {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET ?? "jwtSecret", {
      expiresIn: "15d",
    });
    return token;
  } catch (error) {
    return false;
  }
}
