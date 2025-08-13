import { Calculate } from "@/entities/calculate";

export async function POST(request: Request) {
  const res = await request.json();
  const { distance, consume, price, toll, hostings, foods } = res;
  const calcule = new Calculate(
    distance,
    consume,
    price,
    toll,
    hostings,
    foods
  );
  return Response.json({
    getFuelExpensesCalcule: calcule.getFuelCalcule(),
    getExpensesCalcule: calcule.getExpensesCalcule(),
    getTotalExpesesCalcule: calcule.getTotalExpenses(),
  });
}
