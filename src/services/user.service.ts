import prisma from "../configs/db.config";
import { TRegisterUserSchema } from "../schemas/auth.schema";

export const createUserService = async (
  data: TRegisterUserSchema,
  imageUrl: string | undefined
) => {
  const createUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
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
