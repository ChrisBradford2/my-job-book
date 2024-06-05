import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function registerUser(username: string, password: string) {
  const newUser = await prisma.user.create({
    data: {
      username,
      password,
    }
  });
  return newUser;
}

export { prisma, registerUser };
