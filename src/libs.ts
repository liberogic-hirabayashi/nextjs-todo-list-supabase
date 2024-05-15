import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createClient = async () => {
  try {
    prisma.$connect();
    console.log("接続しました");
  } catch (error) {
    return Error('接続に失敗しました')
  }
};
