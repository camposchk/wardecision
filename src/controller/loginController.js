const express = require('express');
const LoginService = require('../services/loginService');
const { message } = require('statuses');
const loginService = new LoginService();

module.exports = {
    async login(req, res) {
        const { codigo, senha } = req.body;

        try {
            const { empresa, token } = await loginService.login(codigo, senha);

            res.status(200).json({ empresa, token });
        } catch (error) {
            res.status(401).json({ error: message });
        }
    },
};
