import { z } from "zod";

export const newLoginFormSchema = z.object({
  email: z
    .email({ message: "E-mail Inválido" })
    .min(1, { message: "Campo Obrigatório" })
    .nonempty({ message: "Campo Obrigatório" }),
  password: z
    .string()
    .min(1, { message: "Campo Obrigatório" })
    .nonempty({ message: "Campo Obrigatório" }),
});

export type NewLoginFormSchema = z.infer<typeof newLoginFormSchema>;
