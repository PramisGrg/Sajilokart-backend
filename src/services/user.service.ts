import prisma from "../configs/db.config";
import { TUpdateUserSchema } from "../schemas/user.schema";
import KnownError from "../utils/knownError.utils";

export const getUserService = (userId: string) => {
  const user = prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("Requested user not found on the database");

  return user;
};

export const updateUserService = async (
  data: TUpdateUserSchema,
  id: string,
  imageUrl: string | undefined
) => {
  const exisitngUser = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!exisitngUser) throw new KnownError("No such user found on database");

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      image: imageUrl,
    },
  });

  return updatedUser;
};
