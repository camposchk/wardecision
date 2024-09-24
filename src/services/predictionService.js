const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PredictionService {
  
  // Cria uma nova predição no banco de dados
  async savePrediction(data) {
    try {
      const { ID_Modelo_ML, Saida } = data;

      // Cria a predição com a data atual
      const newPrediction = await prisma.decisao.create({
        data: {
          ID_Modelo_ML,
          Saida,
          Data: new Date(),
        },
      });

      return newPrediction;
    } catch (error) {
      throw new Error(`Erro ao salvar a predição: ${error.message}`);
    }
  }

  // Busca uma predição pelo seu ID
  async getPredictionById(id) {
    try {
      const prediction = await prisma.decisao.findUnique({
        where: { ID: parseInt(id) },
      });

      if (!prediction) {
        throw new Error('Predição não encontrada');
      }

      return prediction;
    } catch (error) {
      throw new Error(`Erro ao buscar a predição: ${error.message}`);
    }
  }

  // Lista todas as predições
  async getAllPredictions() {
    try {
      const predictions = await prisma.decisao.findMany();
      return predictions;
    } catch (error) {
      throw new Error(`Erro ao listar predições: ${error.message}`);
    }
  }
}

module.exports = PredictionService;
