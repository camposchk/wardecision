const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ModelService {
  async createModel(data) {
    const createModel = await prisma.modelo_Machine_Learning.create({
      data: {
        ID_Dados: data.ID_Dados,
        Data: data.Data,
        Parametros: data.Parametros,
        Decisoes: {
          create: data.Decisoes,
        },
      },
    });
    return createModel;
  }

  async getModelById(id) {
    return prisma.modelo_Machine_Learning.findUnique({
      where: { ID: parseInt(id) },
      include: {
        Dados_Treino: true,
        Decisoes: true,
      },
    });
  }

  async updateModel(id, data) {
    return prisma.modelo_Machine_Learning.update({
      where: { ID: parseInt(id) },
      data: {
        ID_Dados: data.ID_Dados,
        Data: data.Data,
        Parametros: data.Parametros,
        Decisoes: {
          update: data.Decisoes,
        },
      },
    });
  }

  async deleteModel(id) {
    return prisma.modelo_Machine_Learning.delete({
      where: { ID: parseInt(id) },
    });
  }
}

module.exports = ModelService;
