const PredictionService = require('../services/predictionService');
const predictionService = new PredictionService();

module.exports = {
  
  // Endpoint para salvar a predição no banco de dados
  async savePrediction(req, res) {
    const data = req.body;
    
    try {
      const savedPrediction = await predictionService.savePrediction(data);

      res.status(201).json({
        message: 'Predição salva com sucesso!',
        prediction: savedPrediction,
      });
    } catch (error) {
      console.error('Erro ao salvar predição:', error.message);
      res.status(400).json({ error: error.message });
    }
  },

  // Endpoint para buscar uma predição pelo ID
  async getPredictionById(req, res) {
    const id = req.params.id;

    try {
      const prediction = await predictionService.getPredictionById(id);

      res.status(200).json(prediction);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // Endpoint para listar todas as predições
  async getAllPredictions(req, res) {
    try {
      const predictions = await predictionService.getAllPredictions();

      res.status(200).json(predictions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
