import { prisma } from "../lib/prisma";
import { AppError } from "../middlewares/errorHandler";
import { userService } from "./usuario/user.service";
import { companyService } from "./empresa/company.service";
import { RegisterBody, LoginBody } from "../schemas/auth.schema";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/jwt";

export const authService = {
  /**
   * Orquestra o registro de uma nova Empresa e seu Usuário Admin.
   */
  async register(data: RegisterBody) {
    const { companyName, userName, email, password } = data;

    // 1. Verifica se o e-mail já existe
    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      throw new AppError("Este e-mail já está em uso.", 409); // 409 Conflict
    }

    // 2. Usa uma transação para criar a empresa e o usuário
    // Isso garante que se um falhar, o outro também falha (atomic)
    try {
      const result = await prisma.$transaction(async (tx) => {
        // 2a. Cria a Empresa (com lógica de trial)
        const newCompany = await companyService.create(companyName);

        // 2b. Cria o Usuário (com senha criptografada)
        const newUser = await userService.create({
          name: userName,
          email: email,
          password: password,
          role: "ADMIN", // Primeiro usuário é o ADMIN da empresa
          company: {
            connect: { id: newCompany.id }, // Conecta o usuário à empresa
          },
        });

        // Remove a senha antes de retornar
        delete (newUser as any).password;
        return { user: newUser, company: newCompany };
      });

      // 3. TODO: Gerar um Token JWT

      return result;
    } catch (error) {
      // Se a transação falhar, joga um erro
      if (error instanceof AppError) throw error;
      throw new AppError("Não foi possível completar o registro.", 500);
    }
  },

  // login function
  async login(data: LoginBody) {
    const { email, password } = data;

    // 1. Busca o usuário pelo e-mail
    const user = await userService.findByEmail(email);

    // Se não achar o usuário, lança erro de credenciais inválidas
    if (!user) {
      throw new AppError("E-mail ou senha incorretos.", 401);
    }

    // 2. Compara a senha enviada com o hash do banco
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("E-mail ou senha incorretos.", 401);
    }

    // 3. Gera o Token JWT
    const token = generateToken({
      userId: user.id,
      companyId: user.companyId,
      role: user.role,
    });

    // Remove a senha antes de retornar os dados do usuário
    const userResponse = { ...user };
    delete (userResponse as any).password;

    return { token, user: userResponse };
  },
};
