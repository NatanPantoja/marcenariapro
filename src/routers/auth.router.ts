import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(registerSchema),
  registerController // 2. DESCOMENTE (OU ADICIONE) ESTA LINHA
);

authRouter.post(
  "/login",
  validateRequest(loginSchema), // Valida se mandou email e senha
  loginController // Faz o login
);

export { authRouter };
