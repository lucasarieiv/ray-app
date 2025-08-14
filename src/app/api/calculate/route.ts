import { Calculate } from "@/entities/calculate";

export async function POST(request: Request) {
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
  return Response.json({
    getFuelExpensesCalcule: calcule.getFuelCalcule(),
    getExpensesCalcule: calcule.getExpensesCalcule(),
    getTotalExpesesCalcule: calcule.getTotalExpenses(),
  });
}
