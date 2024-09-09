const { comparePassword, generateToken } = require('../config/auth');
//prisma connection
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class LoginService {
    async login(codigo, senha) {
        const empresa = await prisma.empresa.findUnique({
            where: { Codigo: codigo },
            include: { Matriz: true },
        });

        if (!empresa || !empresa.Matriz) {
            throw new Error('Login ou senha incorretos.');
        }

        const senhaCorreta = await comparePassword(senha, empresa.Matriz.senha);

        if(!senhaCorreta) {
            throw new Error('Código ou senha incorretos.');
        }

        const token = generateToken({ id: empresa.id, codigo: empresa.Codigo});

        return { empresa, token };
    }
}

module.exports = LoginService;