// src/routers/admin.router.ts
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureRole } from "../middlewares/ensureRole";
import { adminController } from "../controllers/admin.controller";

const adminRouter = Router();

// Aplica autenticação em TODAS as rotas abaixo
adminRouter.use(ensureAuthenticated);

// Rota GET /admin/dashboard
// Apenas 'SAAS_OWNER' pode acessar
adminRouter.get(
  "/dashboard",
  ensureRole(["SAAS_OWNER"]),
  adminController.getDashboard
);

export { adminRouter };
