import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database connection falied", error);
    process.exit(1);
  }
};

checkConnection();

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default prisma;
