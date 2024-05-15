import { PrismaClient } from "@prisma/client";
import { createClient } from "../../../libs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await createClient();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json("GET Error");
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, status } = await req.json();
    await createClient();
    const posts = await prisma.post.create({ data: { title, status } });
    return NextResponse.json({ message: "Success", posts });
  } catch (error) {
    return NextResponse.json("POST Error");
  } finally {
    await prisma.$disconnect();
  }
};
