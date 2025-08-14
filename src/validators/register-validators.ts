import z from "zod";

export const newRegisterFormSchema = z
  .object({
    email: z
      .email({ message: "E-mail Inválido" })
      .nonempty({ message: "Campo Obrigatório" }),
    name: z
      .string({ message: "Nome Inválido" })
      .nonempty({ message: "Campo Obrigatório" }),
    password: z
      .string()
      .min(6, { message: "Senha deve conter mínimo de 6 Caracteres" })
      .nonempty({ message: "Preencha o Campo" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

export type NewRegisterFormSchema = z.infer<typeof newRegisterFormSchema>;
