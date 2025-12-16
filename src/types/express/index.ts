import { Request } from "express";

// Definimos a interface aqui para ficar organizado
interface RequestUser {
  id: string;
  companyId: string; // Essencial para filtrar dados da empresa
  role: string; // String genérica para aceitar ADMIN, USER e SAAS_OWNER
}

// Expandimos o Express globalmente
declare global {
  namespace Express {
    interface Request {
      user: RequestUser;
    }
  }
}
