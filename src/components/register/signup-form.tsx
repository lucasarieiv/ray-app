"use client";
import {
  NewRegisterFormSchema,
  newRegisterFormSchema,
} from "@/validators/register-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { CalculatorIcon } from "lucide-react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";

export function SignUpForm() {
  const form = useForm<NewRegisterFormSchema>({
    resolver: zodResolver(newRegisterFormSchema),
  });

  async function onSubmit(data: NewRegisterFormSchema) {
    const response = await fetch("api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      redirect('/login')
    }
  }

  return (
    <div className="w-full">
      <div className="flex gap-4 items-center mb-8">
        <CalculatorIcon size={32} color="#2563eb" />
        <h1 className="text-4xl font-semibold text-[#2563eb]">
          Criar Conta | <br />
          Calculadora
        </h1>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div>
          <div>
            <label htmlFor="email">E-mail</label>
          </div>
          <div className="flex flex-col gap-0.5">
            <Input
              {...form.register("email")}
              name="email"
              className="rounded-md"
              type="text"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 ml-2">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="name">Nome</label>
          </div>
          <div className="flex flex-col gap-0.5">
            <Input
              {...form.register("name")}
              name="name"
              className="rounded-md"
              type="text"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 ml-2">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="password">Senha</label>
          </div>
          <div className="flex flex-col gap-0.5">
            <Input
              {...form.register("password")}
              name="password"
              className="rounded-md"
              type="password"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 ml-2">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="confirmPassword">Confirmar Senha</label>
          </div>
          <div className="flex flex-col gap-0.5">
            <Input
              {...form.register("confirmPassword")}
              name="confirmPassword"
              className="rounded-md"
              type="password"
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 ml-2">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p>
            Já possui uma conta?{" "}
            <span className="font-semibold text-[#2563eb]">
              <Link href={"/login"}>Fazer Login</Link>
            </span>
          </p>
        </div>
        <Button className="mt-8" type="submit">
          Criar Conta
        </Button>
      </form>
    </div>
  );
}
