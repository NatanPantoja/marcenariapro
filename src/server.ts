import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

// Importa suas rotas e middlewares
import { authRouter } from "./routers/auth.router";
import { AppError, errorHandler } from "./middlewares/errorHandler";
import { adminRouter } from "./routers/admin.router";

// Cria a aplicação Express
const app = express();

// --- Configuração dos Middlewares ---

// 1. CORS: Permite que seu front-end (Vercel) acesse a API
app.use(cors());

// 2. Permite que o Express leia JSON no corpo das requisições
app.use(express.json());

// --- Configuração das Rotas ---
// Todas as rotas de autenticação começarão com /auth
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

// --- Middleware de Erro ---
// DEVE ser o último middleware a ser usado (depois de todas as rotas)
app.use(errorHandler);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
