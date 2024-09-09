const express = require('express');
const routes = express.Router();

const empresa = require('./src/controller/empresaController');
const login = require('./src/controller/loginController')
const { authenticateToken } = require('./src/config/auth');  // Importe o middleware de autenticação

routes
   // Rota para registro de empresas (não autenticada)
routes.post('/add', empresa.registrarEmpresa);

// Rota para login (não autenticada)
routes.post('/login', login.login);

// Rotas protegidas (autenticadas)
routes.get('/empresa/:id', authenticateToken, empresa.getEmpresaById);
routes.delete('/remove-empresa/:id', authenticateToken, empresa.deleteEmpresaById);
routes.put('/update-empresa/:id', authenticateToken, empresa.updateEmpresaById);


module.exports = routes;
