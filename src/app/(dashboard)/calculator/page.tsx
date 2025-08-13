"use client";
import { Badge } from "@/components/badge/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalculeResponse } from "@/types/api";
import {
  Bed,
  CalculatorIcon,
  Fuel,
  Hamburger,
  PlusIcon,
  Receipt,
  Wallet,
} from "lucide-react";
import { useState } from "react";

export default function Calculator() {
  const [data, setData] = useState({
    distance: 0,
    consume: 0,
    price: formatToBRL("0"),
  });
  const [toll, setToll] = useState<number[]>([]);
  const [tollValue, setTollValue] = useState(formatToBRL("0"));
  const [hostingValue, setHostingValue] = useState(formatToBRL("0"));
  const [hostings, setHostings] = useState<number[]>([]);
  const [foodValue, setFoodValue] = useState(formatToBRL("0"));
  const [foods, setFoods] = useState<number[]>([]);
  const [totalData, setTotalData] = useState<CalculeResponse>({
    getFuelExpensesCalcule: 0,
    getExpensesCalcule: 0,
    getTotalExpesesCalcule: 0,
  });

  const totalToll = Number.parseFloat(
    toll
      .reduce((prev, acc) => {
        return (prev += acc);
      }, 0)
      .toFixed(2)
  );

  const totalHostings = Number.parseFloat(
    hostings
      .reduce((prev, acc) => {
        return (prev += acc);
      }, 0)
      .toFixed(2)
  );

  const totalFoods = Number.parseFloat(
    foods
      .reduce((prev, acc) => {
        return (prev += acc);
      }, 0)
      .toFixed(2)
  );

  async function calculate() {
    const response = await fetch("api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        price: Number.parseFloat(formatToNumber(data.price).toFixed(2)),
        toll: totalToll,
        hostings: totalHostings,
        foods: totalFoods,
      }),
    });
    const responseData: CalculeResponse = await response.json();
    if (response.status == 200) {
      setTotalData(responseData);
    }
  }

  async function handleSaveCalcule() {
    const response = await fetch("api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        price: Number.parseFloat(formatToNumber(data.price).toFixed(2)),
        toll: totalToll,
        hostings: totalHostings,
        foods: totalFoods,
      }),
    });
  }

  function formatToNumber(value: string) {
    const formattedAmount = value
      .replace("/\\s/g", "")
      .replace("R$", "")
      .replace("/\\./g", "")
      .replace(",", ".");
    return Number(formattedAmount);
  }

  function formatToBRL(value: string | number) {
    const digits = value.replace(/\D/g, "");
    const number = Number(digits) / 100;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handleAddToll() {
    const valueNumber = formatToNumber(tollValue);
    setToll([...toll, Number(valueNumber)]);
    setTollValue(formatToBRL("0"));
  }

  function handleDeleteToll(idxRemove: number) {
    const newToll = [...toll];
    newToll.splice(idxRemove, 1);
    setToll(newToll);
  }

  function handleAddHosting() {
    const valueNumber = formatToNumber(hostingValue);
    setHostings([...hostings, valueNumber]);
    setHostingValue(formatToBRL("0"));
  }

  function handleDeleteHosting(idxRemove: number) {
    const newHostings = [...hostings];
    newHostings.splice(idxRemove, 1);
    setHostings(newHostings);
  }

  function handleAddFoodExpense() {
    const valueNumber = formatToNumber(foodValue);
    setFoods([...foods, valueNumber]);
    setFoodValue(formatToBRL("0"));
  }

  function handleDeleteFoodExpense(idxRemove: number) {
    const newFoods = [...hostings];
    newFoods.splice(idxRemove, 1);
    setFoods(newFoods);
  }

  return (
    <div>
      <div className="flex gap-4 items-center mb-8">
        <CalculatorIcon size={32} color="#2563eb" />
        <h1 className="text-4xl font-semibold text-[#2563eb]">Calculadora</h1>
      </div>
      <div className="my-8">
        <div className="flex items-center gap-4">
          <Fuel size={28} color="#2563eb" />
          <h1 className="text-2xl font-semibold my-4">Despesa Combustível</h1>
        </div>
        <div className="flex justify-between gap-8">
          <div className="flex flex-col w-full">
            <div>
              <label htmlFor="">Distância</label>
            </div>
            <div className="flex">
              <Input
                className="rounded-bl-md rounded-tl-md"
                type="text"
                onChange={(e) =>
                  setData({ ...data, distance: Number(e.target.value) })
                }
              />
              <div className="flex items-center px-6 justify-center bg-[#2563eb] h-14 border-input rounded-br-md rounded-tr-md">
                <p className="font-semibold text-white text-lg">km</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div>
              <label htmlFor="">Consumo médio do veículo</label>
            </div>
            <div className="flex">
              <Input
                className="rounded-bl-md rounded-tl-md"
                type="text"
                onChange={(e) =>
                  setData({ ...data, consume: Number(e.target.value) })
                }
              />
              <div className="flex items-center px-6 justify-center bg-[#2563eb] h-14 border-input rounded-br-md rounded-tr-md">
                <p className="w-12 font-semibold text-white text-lg">km / l</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div>
              <label htmlFor="">Preço por litro</label>
            </div>
            <div className="flex">
              <Input
                value={data.price}
                className="rounded-bl-md rounded-tl-md"
                type="text"
                onChange={(e) =>
                  setData({ ...data, price: formatToBRL(e.target.value) })
                }
              />
              <div className="flex items-center px-6 justify-center bg-[#2563eb] h-14 border-input rounded-br-md rounded-tr-md">
                <p className="w-12 font-semibold text-white text-lg">por l</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-8">
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <Receipt size={28} color="#2563eb" />
            <h1 className="text-2xl font-semibold my-4">Despesa Pedágios +</h1>
          </div>
          <div className="flex items-center gap-4">
            <Bed size={28} color="#2563eb" />
            <h1 className="text-2xl font-semibold my-4">Hospedagem +</h1>
          </div>
          <div className="flex items-center gap-4">
            <Hamburger size={28} color="#2563eb" />
            <h1 className="text-2xl font-semibold my-4">Alimentação</h1>
          </div>
        </div>
        <div className="flex flex-col w-full my-4">
          <div>
            <label htmlFor="">Despesas Pedágio</label>
          </div>
          <div className="flex">
            <Input
              value={tollValue}
              className="rounded-bl-md rounded-tl-md"
              type="text"
              onChange={(e) => setTollValue(formatToBRL(e.target.value))}
            />
            <button
              onClick={handleAddToll}
              className="flex items-center cursor-pointer px-6 justify-center bg-[#2563eb] h-14 border-input rounded-br-md rounded-tr-md"
            >
              <PlusIcon size={24} color="#fff" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 my-2">
            {toll
              .map((data, idx) => (
                <Badge
                  key={idx}
                  idx={idx}
                  value={data}
                  handleDelete={handleDeleteToll}
                />
              ))
              .reverse()}
          </div>
        </div>
        <div className="flex flex-col w-full my-4">
          <div>
            <label htmlFor="">Despesas Hospedagem</label>
          </div>
          <div className="flex">
            <Input
              value={hostingValue}
              className="rounded-bl-md rounded-tl-md"
              type="text"
              onChange={(e) => setHostingValue(formatToBRL(e.target.value))}
            />
            <button
              onClick={handleAddHosting}
              className="flex items-center cursor-pointer px-6 justify-center bg-[#2563eb] h-14 border-input rounded-br-md rounded-tr-md"
            >
              <PlusIcon size={24} color="#fff" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 my-2">
            {hostings.map((data, idx) => (
              <Badge
                key={idx}
                idx={idx}
                value={data}
                handleDelete={handleDeleteHosting}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full my-4">
          <div>
            <label htmlFor="">Despesas Alimentação</label>
          </div>
          <div className="flex">
            <Input
              value={foodValue}
              className="rounded-bl-md rounded-tl-md"
              type="text"
              onChange={(e) => setFoodValue(formatToBRL(e.target.value))}
            />
            <button
              onClick={handleAddFoodExpense}
              className="flex items-center cursor-pointer px-6 justify-center bg-[#2563eb] h-14 border-input rounded-br-md rounded-tr-md"
            >
              <PlusIcon size={24} color="#fff" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 my-2">
            {foods.map((data, idx) => (
              <Badge
                key={idx}
                idx={idx}
                value={data}
                handleDelete={handleDeleteFoodExpense}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 my-8">
        <Button variant={"ghost"} onClick={calculate} type="button">
          Calcular Consumo
        </Button>

        <Button
          variant={"outline"}
          className="bg-green-400"
          onClick={handleSaveCalcule}
        >
          Salvar
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-8">
        <Wallet size={28} color="#2563eb" />
        <h1 className="text-2xl font-semibold">Resultado</h1>
      </div>
      <div className="bg-blue-200 rounded-md p-8 pb-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">
              Custo Combustível:{" "}
              {formatToBRL(String(totalData.getFuelExpensesCalcule * 100))}
            </p>
            <p className="text-lg font-semibold">
              Custo Pedágio + Hospedagem + Alimentação:{" "}
              {formatToBRL(String(totalData.getExpensesCalcule * 100))}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-3xl font-semibold ">Custo Total</p>
            <p className="text-4xl">
              {formatToBRL(String(totalData.getTotalExpesesCalcule * 100))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
