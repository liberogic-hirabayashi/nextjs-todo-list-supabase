import { PrismaClient } from "@prisma/client";

export const prismaInstats = new PrismaClient();

export const createClient = async () => {
  try {
    prismaInstats.$connect();
    console.log("接続しました");
  } catch (error) {
    return Error("接続に失敗しました");
  }
};
