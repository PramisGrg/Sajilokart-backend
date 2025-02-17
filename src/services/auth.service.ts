import jwt from "jsonwebtoken";
import prisma from "../configs/db.config";
import { TLoginUserSchema, TRegisterUserSchema } from "../schemas/auth.schema";
import bcrypt from "bcrypt";
import KnownError from "../utils/knownError.utils";
import { generateToken } from "../utils/generateToken.utils";

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
      phoneNumber: data.phoneNumber,
      email: data.email,
      image: imageUrl,
      password: hashedPassword,
      role: data.role,
    },
  });

  if (!createUser) throw new Error("Error while creating user");

  return { ...createUser, image: imageUrl };
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

  const token = generateToken(existingUser);

  return { token, ...existingUser };
};
