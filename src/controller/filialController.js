const express = require('express');
const FilialService = require('../services/filialService');
const filialService = new FilialService();

module.exports = {
  async registrarFilial(req, res) {
    console.log(req.body);
    const data = req.body;
    try {
      const novaFilial = await filialService.createFilial(data);
      res.status(201).json(novaFilial);
    } catch (error) {
      console.error("Erro ao registrar filial:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async getFilialById(req, res) {
    const id = req.params.id;

    try {
      const filial = await filialService.getFilialById(id);

      if (!filial) {
        return res.status(404).json({ error: 'Filial não encontrada' });
      }

      res.status(200).json(filial);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar filial' });
    }
  },

  async updateFilialById(req, res) {
    const id = req.params.id;
    const data = req.body;

    try {
      const filialAtualizada = await filialService.updateFilial(id, data);
      res.status(200).json(filialAtualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteFilialById(req, res) {
    const id = req.params.id;

    try {
      await filialService.deleteFilial(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
