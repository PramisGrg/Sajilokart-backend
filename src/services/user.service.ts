import prisma from "../configs/db.config";

export const getUserService = (userId: string) => {
  const user = prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("Requested user not found on the database");

  return user;
};

// export const updateUserService = (data) => {
//   console.log(data, "This is data");
// };
