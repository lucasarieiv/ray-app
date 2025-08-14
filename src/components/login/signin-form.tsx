"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { CalculatorIcon } from "lucide-react";
import Link from "next/link";
import {
  NewLoginFormSchema,
  newLoginFormSchema,
} from "@/validators/login-validators";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignInForm() {
  const form = useForm<NewLoginFormSchema>({
    resolver: zodResolver(newLoginFormSchema),
  });
  
  async function onSubmit(data: NewLoginFormSchema) {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response?.error) {
      return;
    }
    redirect("/calculator");
  }

  return (
    <div className="w-full">
      <div className="flex gap-4 items-center mb-8">
        <CalculatorIcon size={32} color="#2563eb" />
        <h1 className="text-4xl font-semibold text-[#2563eb]">
          Bem-Vindo | <br />
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
        <div className="text-right">
          <p>
            Não tem uma Conta?{" "}
            <span className="font-semibold text-[#2563eb]">
              <Link href={"/register"}>Criar Conta</Link>
            </span>
          </p>
        </div>
        <Button className="mt-8" type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
}
