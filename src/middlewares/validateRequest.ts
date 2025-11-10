// src/middlewares/validateRequest.ts

import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { AppError } from "./errorHandler";

export const validateRequest =
  (schema: z.ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.issues[0].message;

        return next(new AppError(errorMessage, 400));
      }

      return next(new AppError("Erro interno durante a validação.", 500));
    }
  };
