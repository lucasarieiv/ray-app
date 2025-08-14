import prisma from "@/lib/db";
import { Calculate } from "@/entities/calculate";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/route";
import { Calculation } from "@/generated/prisma";

export async function GET() {
  const { id } = await getServerSession(nextAuthOptions);
  const trips = await prisma.calculation.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const outputTrips = trips.map((trip: Calculation) => ({
    id: trip.id,
    distance: trip.distance,
    consumption: trip.consumption,
    price: trip.price,
    toll: trip.toll,
    accomodation: trip.accomodation,
    food: trip.food,
    totalFuelExpense: trip.totalFuelExpense,
    totalExpenses: trip.totalExpenses,
    totalCosts: trip.totalCosts,
    createdAt: trip.createdAt,
  }));
  return new Response(JSON.stringify({ trips: outputTrips }), {
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
      distance: distance,
      consumption: consumption,
      price: price,
      toll: toll,
      accomodation: accomodation,
      food: food,
      totalFuelExpense: calcule.getTotalFuelExpense(),
      totalExpenses: calcule.getTotalExpenses(),
      totalCosts: calcule.getTotal(),
    },
  });
  return new Response(
    JSON.stringify({
      totalFuel: calcule.getTotalFuelExpense(),
      totalExpenses: calcule.getTotalExpenses(),
      total: calcule.getTotal(),
    }),
    { status: 201 }
  );
}
