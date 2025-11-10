// src/services/usuario/user.service.ts
import { userRepository } from "../../repositories/user.repository";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcryptjs";

export const userService = {
  /**
   * Cria um novo usuário, cuidando de criptografar a senha.
   */
  async create(data: Prisma.UserCreateInput) {
    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Salva no banco usando o repositório
    return userRepository.create({
      ...data,
      password: hashedPassword,
    });
  },

  /**
   * Apenas repassa a chamada para o repositório
   */
  async findByEmail(email: string) {
    return userRepository.findByEmail(email);
  },
};
