// src/routers/auth.router.ts

import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { registerSchema } from "../schemas/auth.schema";

// 1. IMPORTE O NOVO CONTROLLER
import { registerController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(registerSchema),
  registerController // 2. DESCOMENTE (OU ADICIONE) ESTA LINHA
);

export { authRouter };
