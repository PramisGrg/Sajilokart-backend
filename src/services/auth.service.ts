import prisma from "../configs/db.config";
import { loginUser } from "../controllers/auth.controller";
import { TLoginUserSchema, TRegisterUserSchema } from "../schemas/auth.schema";
import bcrypt from "bcrypt";

export const createUserService = async (
  data: TRegisterUserSchema,
  imageUrl: string | undefined
) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const createUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phoneNumber: data.phoneNumber,
      image: imageUrl ? imageUrl : " ",
    },
  });

  const createRole = await prisma.role.create({
    data: {
      role: data.role,
    },
  });

  if (!createUser && !createRole) throw new Error("Failed to create user");

  return { user: createUser, role: createRole };
};

export const loginUserService = async (data: TLoginUserSchema) => {
  try {
    console.log(data, "This is data");

    return data;
  } catch (error) {
    console.log(error);
  }
};
