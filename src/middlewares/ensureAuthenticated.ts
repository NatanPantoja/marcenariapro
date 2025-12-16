// src/middlewares/ensureAuthenticated.ts

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "./errorHandler";

interface TokenPayload {
  userId: string;
  companyId: string;
  role: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // 1. Busca o token no cabeçalho
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não informado.", 401);
  }

  // 2. O token vem assim: "Bearer eyJhbGciOi..."
  // Precisamos separar o "Bearer" do token em si
  const [, token] = authHeader.split(" ");

  try {
    // 3. Verifica se o token é válido usando a SENHA SECRETA
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET ausente no .env");
    }

    const decoded = verify(token, secret);

    // 4. Recupera as informações do usuário de dentro do token
    const { userId, companyId, role } = decoded as TokenPayload;

    // 5. Salva no request para as próximas rotas usarem
    request.user = {
      id: userId,
      companyId,
      role,
    };

    return next();
  } catch {
    throw new AppError("Token inválido.", 401);
  }
}
