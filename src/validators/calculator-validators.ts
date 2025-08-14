import z from "zod";

export const newCalculatorSchema = z.object({
  distance: z.coerce
    .number()
    .gt(0, { message: "Campo Obrigatório" })
    .nonnegative({ message: "O Valor deve ser Positivo" })
    .nonoptional({ message: "Campo Obrigatório" }),
  consumption: z.coerce
    .number()
    .gt(0, { message: "Campo Obrigatório" })
    .nonnegative({ message: "O Valor deve ser Positivo" })
    .nonoptional({ message: "Campo Obrigatório" }),
  price: z.coerce
    .number()
    .gt(0, { message: "Campo Obrigatório" })
    .nonnegative({ message: "O Valor deve ser Positivo" })
    .nonoptional({ message: "Campo Obrigatório" }),
  toll: z.coerce.number().nonnegative({ message: "O Valor deve ser Positivo" }),
  accomodation: z.coerce
    .number()
    .nonnegative({ message: "O Valor deve ser Positivo" }),
  food: z.coerce.number().nonnegative({ message: "O Valor deve ser Positivo" }),
});

export type NewCalculatorSchema = z.infer<typeof newCalculatorSchema>;
