"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalculeResponse } from "@/types/api";
import {
  NewCalculatorSchema,
  newCalculatorSchema,
} from "@/validators/calculator-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bed,
  CalculatorIcon,
  Fuel,
  Hamburger,
  Receipt,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { CurrencyInput } from "react-currency-mask";
import { Controller, useForm } from "react-hook-form";

export default function Calculator() {
  const { handleSubmit, control, formState, register, reset } = useForm({
    resolver: zodResolver(newCalculatorSchema),
  });
  const [totalData, setTotalData] = useState<CalculeResponse>({
    totalFuel: 0,
    totalExpenses: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  function formatToBRL(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  async function handleApiCall(url: string, data: NewCalculatorSchema) {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData: CalculeResponse = await response.json();
      if (response.status == 200 || response.status == 201) {
        setTotalData(responseData);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  async function handleCalcule(data: NewCalculatorSchema) {
    await handleApiCall("/api/calculate", data);
  }

  async function handleSaveHistory(data: NewCalculatorSchema) {
    await handleApiCall("api/history", data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleSaveHistory)}>
      <div className="flex gap-4 items-center mb-8">
        <CalculatorIcon size={32} color="#2563eb" />
        <h1 className="text-4xl font-semibold text-[#2563eb]">Calculadora</h1>
      </div>
      <div className="my-8">
        <div className="flex items-center gap-4">
          <Fuel size={28} color="#2563eb" />
          <h1 className="text-2xl font-semibold my-4">Despesa Combustível</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col w-full">
            <div>
              <label htmlFor="distance">Distância</label>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex">
                <Input
                  {...register("distance")}
                  name="distance"
                  className="rounded-bl-md rounded-tl-md"
                  type="text"
                />
                <div className="flex items-center px-6 justify-center bg-[#2563eb] h-14 min-w-24 border-input rounded-br-md rounded-tr-md">
                  <p className="font-semibold text-white text-lg">km</p>
                </div>
              </div>
              {formState.errors.distance && (
                <p className="text-red-500 ml-2">
                  {formState.errors.distance.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div>
              <label htmlFor="">Consumo médio do veículo</label>
            </div>
            <div className="flex flex-col gap-0 5">
              <div className="flex">
                <Input
                  {...register("consumption")}
                  className="rounded-bl-md rounded-tl-md"
                  type="text"
                />
                <div className="flex items-center px-6 justify-center bg-[#2563eb] h-14 border-input rounded-br-md rounded-tr-md">
                  <p className="w-12 font-semibold text-white text-lg">
                    km / l
                  </p>
                </div>
              </div>
              {formState.errors.consumption && (
                <p className="text-red-500 ml-2">
                  {formState.errors.consumption.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div>
              <label htmlFor="">Preço por litro</label>
            </div>
            <div className="flex flex-col gap-0 5">
              <div className="flex">
                <Controller
                  name="price"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => {
                    return (
                      <CurrencyInput
                        value={field.value}
                        defaultValue={0}
                        onChangeValue={(_, value) => {
                          field.onChange(value);
                        }}
                        InputElement={
                          <Input
                            className="rounded-bl-md rounded-tl-md"
                            type="text"
                          />
                        }
                      />
                    );
                  }}
                />
                <div className="flex items-center px-6 justify-center bg-[#2563eb] h-14 border-input rounded-br-md rounded-tr-md">
                  <p className="w-12 font-semibold text-white text-lg">por l</p>
                </div>
              </div>
              {formState.errors.price && (
                <p className="text-red-500 ml-2">
                  {formState.errors.price.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="my-8">
        <div className="flex flex-col md:flex-row md:gap-4 my-4">
          <div className="flex items-center gap-4 my-2">
            <Receipt size={28} color="#2563eb" />
            <h1 className="text-2xl font-semibold ">Despesa Pedágios +</h1>
          </div>
          <div className="flex items-center gap-4 my-2">
            <Bed size={28} color="#2563eb" />
            <h1 className="text-2xl font-semibold ">Hospedagem +</h1>
          </div>
          <div className="flex items-center gap-4 my-2">
            <Hamburger size={28} color="#2563eb" />
            <h1 className="text-2xl font-semibold ">Alimentação</h1>
          </div>
        </div>
        <div className="flex flex-col w-full my-4">
          <div>
            <label htmlFor="">Despesas Pedágio</label>
          </div>
          <div className="flex">
            <Controller
              name="toll"
              control={control}
              defaultValue={0}
              render={({ field }) => {
                return (
                  <CurrencyInput
                    value={field.value}
                    onChangeValue={(_, value) => {
                      field.onChange(value);
                    }}
                    InputElement={
                      <Input
                        className="rounded-bl-md rounded-tl-md"
                        type="text"
                      />
                    }
                  />
                );
              }}
            />
          </div>
        </div>
        <div className="flex flex-col w-full my-4">
          <div>
            <label htmlFor="">Despesas Hospedagem</label>
          </div>
          <div className="flex">
            <Controller
              name="accomodation"
              control={control}
              defaultValue={0}
              render={({ field }) => {
                return (
                  <CurrencyInput
                    value={field.value}
                    defaultValue={0}
                    onChangeValue={(_, value) => {
                      field.onChange(value);
                    }}
                    InputElement={
                      <Input
                        className="rounded-bl-md rounded-tl-md"
                        type="text"
                      />
                    }
                  />
                );
              }}
            />
          </div>
        </div>
        <div className="flex flex-col w-full my-4">
          <div>
            <label htmlFor="">Despesas Alimentação</label>
          </div>
          <div className="flex">
            <Controller
              name="food"
              control={control}
              defaultValue={0}
              render={({ field }) => {
                return (
                  <CurrencyInput
                    value={field.value}
                    defaultValue={0}
                    onChangeValue={(_, value) => {
                      field.onChange(value);
                    }}
                    InputElement={
                      <Input
                        className="rounded-bl-md rounded-tl-md"
                        type="text"
                      />
                    }
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 my-8">
        <Button variant={"ghost"} onClick={handleSubmit(handleCalcule)}>
          {!isLoading ? "Calcular Consumo" : "Calculando..."}
        </Button>
        <Button
          variant={"outline"}
          className="bg-[#2563eb] px-8 text-white"
          type="submit"
        >
          {!isLoading ? "Salvar Cálculo" : "Salvando..."}
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-8">
        <Wallet size={28} color="#2563eb" />
        <h1 className="text-2xl font-semibold">Resultado</h1>
      </div>
      <div className="bg-blue-200 rounded-md p-8 pb-8">
        <div className="flex flex-col items-start md:flex-row md:justify-between">
          <div className="py-4 border-b-[1px] border-blue-100 md:border-0">
            <p className="text-lg font-semibold">
              Custo Combustível:{" "}
              <span className="font-bold">
                {formatToBRL(totalData.totalFuel)}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Custo Pedágio + Hospedagem + Alimentação:{" "}
              <span className="font-bold">
                {formatToBRL(totalData.totalExpenses)}
              </span>
            </p>
          </div>
          <div className="flex flex-col md:items-end my-2">
            <p className="text-3xl font-semibold ">Custo Total</p>
            <p className="text-4xl">{formatToBRL(totalData.total)}</p>
          </div>
        </div>
      </div>
    </form>
  );
}
