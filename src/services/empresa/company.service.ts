import { companyRepository } from "../../repositories/company.repository";

export const companyService = {
  /**
   * Cria uma nova empresa com a lógica de trial.
   */
  async create(companyName: string) {
    // Lógica do Trial: Define a data de expiração para 7 dias a partir de agora
    const trialExpiresAt = new Date();
    trialExpiresAt.setDate(trialExpiresAt.getDate() + 7);

    return companyRepository.create({
      name: companyName,
      planStatus: "trial",
      trialExpiresAt: trialExpiresAt,
    });
  },
};
