// src/middlewares/ensureRole.ts

import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";

/**
 * Recebe uma lista de cargos permitidos (ex: ["SAAS_OWNER", "ADMIN"])
 */
export function ensureRole(allowedRoles: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const { role } = request.user; // Já temos o usuário graças ao ensureAuthenticated

    if (!allowedRoles.includes(role)) {
      throw new AppError("Acesso negado: Permissão insuficiente.", 403);
    }

    return next();
  };
}
