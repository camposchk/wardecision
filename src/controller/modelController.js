const express = require('express');
const ModelService = require('../services/modelService');

const app = express();
app.use(express.json());

const modelService = new ModelService();

app.post('/model', async (req, res) => {
  const data = req.body;
  try {
    const novoModelo = await modelService.createModelo(data);
    res.status(201).json(novoModelo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/model/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const modelo = await modelService.getModelById(id);
    if (!modelo) {
      return res.status(404).json({ error: 'Modelo não encontrado' });
    }
    res.status(200).json(modelo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o modelo' });
  }
});

app.put('/model/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const modeloAtualizado = await modelService.updateModel(id, data);
    res.status(200).json(modeloAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/model/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await modelService.deleteModel(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


