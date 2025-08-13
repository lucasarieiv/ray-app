"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .email({ message: "E-mail Inválido" })
    .nonempty({ message: "Preecha o Campo" }),
  password: z
    .string()
    .min(6, { message: "Senha deve conter mínimo de 6 Caracteres" })
    .nonempty({ message: "Preencha o Campo" }),
});

export function SignInForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    const register = LoginSchema.safeParse(userData);
    if (register.error) {
      const getErrors = z.treeifyError(register.error).properties;
      setErrors({
        email: getErrors?.email?.errors,
        password: getErrors?.password?.errors,
      });
      return;
    }

    const response = await signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false
    });
    if (response?.error) {
      return;
    }
    redirect('/calculator')
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
