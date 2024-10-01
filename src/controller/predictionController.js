const PredictionService = require('../services/predictionService');
const predictionService = new PredictionService();

module.exports = {

  // Método para salvar uma nova predição
  async savePrediction(req, res) {
    const { QC, Saida } = req.body;  // Recebe QC e Saida do corpo da requisição

    try {
      const novaDecisao = await predictionService.createDecisao({ QC, Saida });
      res.status(201).json(novaDecisao);
    } catch (error) {
      console.error("Erro ao salvar predição:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  // Método para buscar todas as predições
  async getAllPredictions(req, res) {
    try {
      // Chama o service para obter as decisões
      const decisoes = await predictionService.getAllDecisoes();
      
      // Renderiza a página com as decisões
      res.render('historypage', { title: 'Histórico', predictions: decisoes });
    } catch (error) {
      console.error('Erro ao buscar decisões:', error);
      if (!res.headersSent) {
        res.status(500).send('Erro ao carregar as decisões');
      }
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
