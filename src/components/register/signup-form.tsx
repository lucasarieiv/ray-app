"use client";
import { FormEvent, useState } from "react";
import { z } from "zod";

const RegisterSchema = z
  .object({
    email: z
      .email({ message: "E-mail Inválido" })
      .nonempty({ message: "Preecha o Campo" }),
    name: z
      .string({ message: "Nome Inválido" })
      .nonempty({ message: "Preecha o Campo" }),
    password: z
      .string()
      .min(6, { message: "Senha deve conter mínimo de 6 Caracteres" })
      .nonempty({ message: "Preencha o Campo" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

export function SignUpForm() {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    const register = RegisterSchema.safeParse(userData);
    if (register.error) {
      const getErrors = z.treeifyError(register.error).properties;
      setErrors({
        email: getErrors?.email?.errors,
        name: getErrors?.name?.errors,
        password: getErrors?.password?.errors,
        confirmPassword: getErrors?.confirmPassword?.errors,
      });
      return;
    }

    const response = await fetch("api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (response.status == 201) {
      setUserData({ email: "", name: "", password: "", confirmPassword: "" });
    }
  }

  return (
    <div>
      <form onSubmit={handleCreateUser}>
        <div>
          <div>
            <label htmlFor="email">E-mail</label>
          </div>
          <div>
            <input
              value={userData.email}
              name="email"
              className="border-2"
              type="text"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          {errors?.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <div>
            <label htmlFor="name">Nome</label>
          </div>
          <div>
            <input
              value={userData.name}
              name="name"
              className="border-2"
              type="text"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>
          {errors?.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <div>
            <label htmlFor="password">Senha</label>
          </div>
          <div>
            <input
              value={userData.password}
              name="password"
              className="border-2"
              type="password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          {errors?.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
        </div>
        <div>
          <div>
            <label htmlFor="confirm_password">Confirmar Senha</label>
          </div>
          <div>
            <input
              value={userData.confirmPassword}
              name="confirm_password"
              className="border-2"
              type="password"
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
              }
            />
          </div>
          {errors?.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit">Criar Conta</button>
      </form>
    </div>
  );
}
