// src/controllers/auth.controller.ts

import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/errorHandler";
import { RegisterBody } from "../schemas/auth.schema";

// 1. IMPORTE O SERVIÇO (agora ele existe)
import { authService } from "../services/auth.service";

export const registerController = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyName, userName, email, password } = req.body;

    // 2. CHAME O SERVIÇO (descomentado)
    const { user, company } = await authService.register({
      companyName,
      userName,
      email,
      password,
    });

    // 3. RETORNE A RESPOSTA DE SUCESSO
    return res.status(201).json({
      message: "Usuário e empresa criados com sucesso!",
      user,
      company,
    });
  } catch (error) {
    return next(error);
  }
};
