const PredictionService = require('../services/predictionService');
const predictionService = new PredictionService();

module.exports = {

  // Método para salvar uma nova predição
  async savePrediction(req, res) {
    const data = req.body;  // Assumindo que QC e Saida vêm do body da requisição

    try {
      const novaDecisao = await predictionService.createDecisao(data);
      res.status(201).json(novaDecisao);
    } catch (error) {
      console.error("Erro ao salvar predição:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  // Método para buscar todas as predições
  async getAllPredictions(req, res) {
    try {
      const decisoes = await predictionService.getAllDecisoes();
      res.status(200).json(decisoes);
    } catch (error) {
      console.error("Erro ao buscar predições:", error.message);
      res.status(500).json({ error: "Erro ao buscar predições" });
    }
  },

  // Método para buscar uma predição por ID
  async getPredictionById(req, res) {
    const id = req.params.id;

    try {
      const decisao = await predictionService.getDecisaoById(id);
      if (!decisao) {
        return res.status(404).json({ error: 'Predição não encontrada' });
      }
      res.status(200).json(decisao);
    } catch (error) {
      console.error("Erro ao buscar predição:", error.message);
      res.status(500).json({ error: 'Erro ao buscar predição' });
    }
  },
};
