"use client";
import { History as IHistory } from "@/types/history";
import {
  Bed,
  CircleDollarSign,
  Fuel,
  Hamburger,
  HistoryIcon,
  Luggage,
  MapPinned,
  Receipt,
} from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toBRL } from "@/lib/toBRL";
import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import { Badge } from "@/components/badge/badge";
ChartJS.register(CategoryScale);

export default function History() {
  const [trip, setHistory] = useState<IHistory[]>([]);
  async function getTripsCalculations() {
    const response = await fetch("api/history", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { trips } = await response.json();
    setHistory(trips);
  }

  useEffect(() => {
    getTripsCalculations();
  }, []);

  return (
    <div className="">
      <div className="flex gap-4 items-center mb-8">
        <HistoryIcon size={32} color="#2563eb" />
        <h1 className="text-4xl font-semibold text-[#2563eb]">Histórico</h1>
      </div>
      <div className="flex flex-col gap-12">
        {trip.map((trip) => (
          <div
            className="flex flex-col md:flex-row justify-between border-2 p-6 rounded-md"
            key={trip.id}
          >
            <div className="">
              <div className="flex items-center gap-4 flex-col md:flex-row md:justify-between mb-4">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100">
                    <Luggage size={32} color="#2563eb" />
                  </div>
                  <h1 className="text-2xl font-semibold text-[#2563eb]">
                    Viagem
                  </h1>
                </div>
                <p className="font-semibold text-center text-gray-400">
                  {format(trip.createdAt, "dd/MM/yyyy 'às' hh:mm:ss")}
                </p>
              </div>
              <div className="py-8 border-b-[1px] border-input">
                <p className="mb-2 text-center text-2xl md:text-left font-bold">
                  Depesas Combustível {""}
                  <span className="py-1 px-4 bg-blue-100 rounded-md text-[#2563eb]">
                    {toBRL(trip.totalFuelExpense)}
                  </span>
                </p>
                <div className="flex flex-col md:flex-row gap-2 my-2">
                  <div className="flex flex-wrap gap-1 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                      <MapPinned size={24} color="#2563eb" />
                    </div>
                    <p className="text-lg font-bold">
                      Distância ({trip.distance}km)
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                      <Fuel size={24} color="#2563eb" />
                    </div>
                    <p className="text-lg font-bold">
                      Consumo Veículo ({trip.consumption} km/l)
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                      <CircleDollarSign size={24} color="#2563eb" />
                    </div>
                    <p className="text-lg font-bold">
                      Preço Combustível ({toBRL(trip.price)})
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-8 border-b-[1px] border-input">
                <p className="mb-2 text-center text-2xl md:text-left font-bold">
                  Depesas Pedágio + Hospedagem + Alimentação{" "}
                  <span className="py-1 px-4 bg-blue-100 rounded-md text-[#2563eb]">
                    {toBRL(trip.totalExpenses)}
                  </span>
                </p>
                <div className="flex flex-col md:flex-row gap-2 my-2">
                  <div className="flex flex-wrap gap-1 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                      <Receipt size={24} color="#2563eb" />
                    </div>
                    <p className="text-lg font-bold">
                      Pedágio ({toBRL(trip.toll)})
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                      <Bed size={24} color="#2563eb" />
                    </div>
                    <p className="text-lg font-bold">
                      Hospedagem ({toBRL(trip.accomodation)})
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                      <Hamburger size={24} color="#2563eb" />
                    </div>
                    <p className="text-lg font-bold">
                      Alimentação ({toBRL(trip.food)})
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-4">
                <p className="mb-2 text-lg md:text-2xl font-bold text-right">
                  Valor Total{" "}
                  <span className="py-1 px-4 bg-blue-100 rounded-md text-[#2563eb]">
                    {toBRL(trip.totalCosts)}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full max-w-2xl text-center">
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Composição dos Custos",
                    },
                  },
                  layout: {},
                }}
                data={{
                  datasets: [
                    {
                      label: "Depesas Combustível",
                      data: [{ x: "Combustível R$", y: trip.totalFuelExpense }],
                    },
                    {
                      label: "Outras",
                      data: [
                        { x: "Pedágio", y: trip.toll },
                        { x: "Hospedagem", y: trip.accomodation },
                        { x: "Alimentação", y: trip.food },
                      ],
                    },
                  ],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
