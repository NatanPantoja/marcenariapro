import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Começando a criar o Super Admin...");

  // 1. Cria a "Empresa Administrativa" (Sua empresa)
  // Verifica se já existe para não duplicar
  const adminCompany = await prisma.company.upsert({
    where: { cnpj: "00000000000000" }, // Um CNPJ fictício para sua admin
    update: {},
    create: {
      name: "WebSolutions Pan Admin",
      cnpj: "00000000000000",
      planStatus: "active", // Sua conta nunca expira
    },
  });

  // 2. Criptografa sua senha
  const passwordHash = await bcrypt.hash("SuaSenhaSuperForte123", 10);

  // 3. Cria o seu Usuário Mestre
  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@websolutionspan.com.br" }, // SEU EMAIL DE ADMIN
    update: {
      role: "SAAS_OWNER", // Garante que é SAAS_OWNER
    },
    create: {
      name: "Natanael Pantoja",
      email: "admin@websolutionspan.com.br",
      password: passwordHash,
      role: "SAAS_OWNER", // <--- O PULO DO GATO
      companyId: adminCompany.id,
    },
  });

  console.log("✅ Super Admin criado com sucesso!");
  console.log("📧 Login:", superAdmin.email);
  console.log("🔑 Senha: SuaSenhaSuperForte123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
