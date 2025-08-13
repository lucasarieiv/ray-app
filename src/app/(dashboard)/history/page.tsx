"use client";
import { History as IHistory } from "@/types/history";
import { HistoryIcon, Luggage } from "lucide-react";
import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<IHistory[]>([]);
  async function getCalculations() {
    const response = await fetch("api/history", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { calculations } = await response.json();
    setHistory(calculations);
  }

  useEffect(() => {
    getCalculations();
  }, []);

  return (
    <div className="">
      <div className="flex gap-4 items-center mb-8">
        <HistoryIcon size={32} color="#2563eb" />
        <h1 className="text-4xl font-semibold text-[#2563eb]">Histórico</h1>
      </div>
      <div className="flex gap-2 flex-col ">
        {history.map((history) => (
          <div className="border-2 p-6 rounded-md" key={history.id}>
            <div className="flex gap-4 items-center mb-8">
              <Luggage size={32} color="#2563eb" />
              <h1 className="text-2xl font-semibold text-[#2563eb]">
                Viagem # {history.id}
              </h1>
            </div>
            <p>
              Total Depesas Combustível:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(history.totalFuelExpense)}
            </p>
            <p>
              Total Depesas Combustível + Pedágio + Hospedagem + Alimentação:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(history.totalExpense)}
            </p>
            <p>{history.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
