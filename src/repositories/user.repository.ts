import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export const userRepository = {
  /**
   * Encontra um usuário pelo e-mail.
   */
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  /**
   * Cria um novo usuário no banco de dados.
   * (Nota: A senha já deve vir criptografada do service)
   */
  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  },
};
