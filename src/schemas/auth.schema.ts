import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    // Validação para o nome da empresa
    companyName: z
      .string()
      .nonempty("O nome da empresa é obrigatório.") // <-- CORRIGIDO AQUI
      .min(2, "O nome da empresa deve ter pelo menos 2 caracteres."),

    // Validação para o nome do usuário
    userName: z
      .string()
      .nonempty("O nome do usuário é obrigatório.") // <-- CORRIGIDO AQUI
      .min(2, "O nome do usuário deve ter pelo menos 2 caracteres."),

    // Validação para o email
    email: z
      .string()
      .nonempty("O e-mail é obrigatório.") // <-- CORRIGIDO AQUI
      .email("Formato de e-mail inválido."),

    // Validação para a senha
    password: z
      .string()
      .nonempty("A senha é obrigatória.") // <-- CORRIGIDO AQUI
      .min(6, "A senha deve ter pelo menos 6 caracteres."),
  }),
});

// (Opcional) Exporta o tipo inferido para usar no controller
export type RegisterBody = z.infer<typeof registerSchema>["body"];

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .nonempty("O e-mail é obrigatório.")
      .email("Formato de e-mail inválido."),

    password: z.string().nonempty("A senha é obrigatória."),
  }),
});

export type LoginBody = z.infer<typeof loginSchema>["body"];
