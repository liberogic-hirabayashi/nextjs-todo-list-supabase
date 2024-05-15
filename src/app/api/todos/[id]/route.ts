import { PrismaClient } from "@prisma/client";
import { createClient } from "../../../../libs";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
    try {
      const id: number = parseInt(req.url.split("/todos/")[1]);
      await createClient();
      const posts = await prisma.post.findFirst({
        where: { id },
      });
      return NextResponse.json({ message: "Success", posts });
    } catch (error) {
      return NextResponse.json("GET Error");
    } finally {
      await prisma.$disconnect();
    }
  };
  
  export const DELETE = async (req: Request, res: NextResponse) => {
    try {
      const id: number = parseInt(req.url.split("/todos/")[1]);
      await createClient();
      const posts = await prisma.post.delete({
        where: { id },
      });
      return NextResponse.json({ message: "Success", posts });
    } catch (error) {
      console.error(error)
      return NextResponse.json("DELETE Error");
    } finally {
      await prisma.$disconnect();
    }
  };
  
  export const PUT = async (req: Request, res: NextResponse) => {
    try {
      const id: number = parseInt(req.url.split("/todos/")[1]);
      const { title,status } = await req.json();
      await createClient();
      const posts = await prisma.post.update({
        data: { title,status },
        where: { id },
      });
      return NextResponse.json({ message: "Success", posts });
    } catch (error) {
      console.error(error);
      return NextResponse.json("PUT Error");
    } finally {
      await prisma.$disconnect();
    }
  };
  