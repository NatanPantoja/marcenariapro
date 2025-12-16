// src/controllers/admin.controller.ts
import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export const adminController = {
  /**
   * Dashboard do Dono do SaaS
   * Lista todas as empresas, status do plano e total de usuários.
   */
  async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      // Busca todas as empresas
      const companies = await prisma.company.findMany({
        include: {
          _count: {
            select: { users: true }, // Conta quantos usuários cada empresa tem
          },
        },
        orderBy: {
          createdAt: "desc", // As mais recentes primeiro
        },
      });

      // Formata os dados para o painel
      const dashboardData = companies.map((company) => ({
        id: company.id,
        name: company.name,
        cnpj: company.cnpj || "Não informado",
        usersCount: company._count.users,
        planStatus: company.planStatus, // trial, active, overdue
        trialExpiresAt: company.trialExpiresAt,
        createdAt: company.createdAt,
      }));

      return res.json({
        message: "Dados do painel recuperados com sucesso.",
        totalCompanies: companies.length,
        data: dashboardData,
      });
    } catch (error) {
      next(error);
    }
  },
};
