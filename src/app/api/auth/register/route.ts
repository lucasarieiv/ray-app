import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  
  const getUserByEmail = await prisma.user.findUnique({
    where: {
      email: res.email,
    },
  });
  if (getUserByEmail)
    return NextResponse.json(
      { message: "Email já cadastrado" },
      { status: 409 }
    );
  try {
    const user = await prisma.user.create({
      data: {
        email: res.email,
        name: res.name,
        password: bcrypt.hashSync(res.password, 10),
      },
    });
    return NextResponse.json(
      { message: "Usuário criado com Successo!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar o usuário" },
      { status: 400 }
    );
  }
}
