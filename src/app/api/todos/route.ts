import { PrismaClient } from "@prisma/client";
import { createClient } from "../../../libs";
import { NextResponse } from "next/server";
import {prismaInstats} from "../../../libs"


export const GET = async (req: Request, res: NextResponse) => {
  try {
    await createClient();
    const posts = await prismaInstats.post.findMany();
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json("GET Error");
  } finally {
    await prismaInstats.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, status } = await req.json();
    await createClient();
    const posts = await prismaInstats.post.create({ data: { title, status } });
    return NextResponse.json({ message: "Success", posts });
  } catch (error) {
    return NextResponse.json("POST Error");
  } finally {
    await prismaInstats.$disconnect();
  }
};
