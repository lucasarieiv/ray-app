import prisma from "@/lib/db";
import { Calculate } from "@/entities/calculate";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const { id } = await getServerSession(nextAuthOptions);
  const calculations = await prisma.calculation.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const outputCalculations = calculations.map((calculation) => ({
    id: calculation.id,
    totalFuelExpense: calculation.fuelExp,
    totalExpense: calculation.totalExpense,
    createdAt: calculation.createdAt
  }));
  return new Response(JSON.stringify({ calculations: outputCalculations }), {
    status: 200,
  });
}

export async function POST(request: Request) {
  
  const { id } = await getServerSession(nextAuthOptions);
  const res = await request.json();
  const { distance, consumption, price, toll, accomodation, food } = res;
  const calcule = new Calculate(
    distance,
    consumption,
    price,
    toll,
    accomodation,
    food
  );
  await prisma.calculation.create({
    data: {
      userId: id,
      fuelExp: calcule.getFuelCalcule(),
      tollExp: toll,
      accomodationExp: accomodation,
      foodExp: food,
      totalExpense: calcule.getTotalExpenses(),
    },
  });
  return new Response(JSON.stringify({ message: "Created" }), { status: 201 });
}
