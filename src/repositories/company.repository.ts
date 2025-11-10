import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export const companyRepository = {
  /**
   * Cria uma nova empresa no banco de dados.
   */
  async create(data: Prisma.CompanyCreateInput) {
    return prisma.company.create({
      data,
    });
  },
};
