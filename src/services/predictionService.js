const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PredictionService {
  // Método para criar uma nova decisão
  async createDecisao(data) {
    const decisaoData = {
      QC: data.QC,
      Data: new Date(),
      Saida: data.Saida,
    };

    const novaDecisao = await prisma.decisao.create({
      data: decisaoData,
    });

    return novaDecisao;
  }

  // Método para buscar todas as decisões
  async getAllDecisoes() {
    return prisma.decisao.findMany();
  }

  // Método para buscar decisão por ID
  async getDecisaoById(id) {
    return prisma.decisao.findUnique({
      where: { ID: parseInt(id) },
    });
  }
}

module.exports = PredictionService;
