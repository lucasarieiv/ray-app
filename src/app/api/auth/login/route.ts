import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const user = await prisma.user.findUnique({ where: { email: res.email } });
  if (!user)
    return NextResponse.json(
      { message: "Email ou Senha Inválidos" },
      { status: 400 }
    );
  const isValidPassword = bcrypt.compareSync(res.password, user.password);
  if (!isValidPassword)
    return NextResponse.json(
      { message: "Email ou Senha Inválidos" },
      { status: 400 }
    );
  return Response.json(
    { id: user.id, email: user.email, name: user.name },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
