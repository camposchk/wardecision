const LoginService = require('../services/loginService');
const { message } = require('statuses');
const loginService = new LoginService();

module.exports = {
    async login(req, res) {
        console.log(req.body);
        const { login, password } = req.body;

        try {
            const { empresa, token } = await loginService.login(login, password);

            res.status(200).json({ empresa, token });
        } catch (error) {
            console.error('Erro no login:', error);
            res.status(401).json({ error: message });
        }
    },
};
