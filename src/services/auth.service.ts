import prisma from "../configs/db.config";
import jwt from "jsonwebtoken";
import { TLoginUserSchema, TRegisterUserSchema } from "../schemas/auth.schema";
import bcrypt from "bcrypt";
import KnownError from "../utils/knownError.utlis";

//Register Service
export const createUserService = async (
  data: TRegisterUserSchema,
  imageUrl: string | undefined
) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (existingUser) throw new KnownError("User already exists");

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

  if (!createUser && !createRole) throw new KnownError("Failed to create user");

  return { user: createUser, role: createRole };
};

//Login Service
export const loginUserService = async (data: TLoginUserSchema) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!existingUser)
    throw new KnownError("User with such details not found, register first");

  const isPasswordValid = await bcrypt.compare(
    data.password,
    existingUser.password
  );

  if (!isPasswordValid)
    throw new KnownError("Wrong Password, please try again");

  const token = jwt.sign(existingUser, "15d");

  return { token, user: existingUser };
};
