import { Request, Response, NextFunction } from "express";

// 1. A classe AppError que você precisa
class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

// 2. O middleware errorHandler
const errorHandler = (
  error: Error | AppError,
  request: Request,
  response: Response,
  next: NextFunction // O 'next' é necessário pela assinatura do Express
) => {
  // Loga o erro no console para debug
  console.error(error);

  // Se for um erro conhecido (criado por nós)
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  // Se for um erro inesperado (500)
  return response.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
};

// 3. Exporte os dois
export { AppError, errorHandler };
