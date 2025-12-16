import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET não está definida no arquivo .env");
}

interface TokenPayload {
  userId: string;
  companyId: string;
  role: string;
}

export const generateToken = (payload: TokenPayload) => {
  // O token vai expirar em 7 dias (padrão de mercado para manter logado)
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};
