const { comparePassword, generateToken, hashPassword } = require('../config/auth');
//prisma connection
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class LoginService {
    async login(codigo, senha) {
        console.log('Código recebido:', codigo); 
        console.log('Senha recebida:', senha);

        const empresa = await prisma.empresa.findFirst({
            where: { Codigo: codigo },
            include: { Matriz: true },
        });

        console.log('Empresa encontrada:', empresa);
        console.log('Matriz encontrada:', empresa.Matriz);

        if (!empresa || !empresa.Matriz) {
            throw new Error('Login ou senha incorretos.');
        }

        console.log('Empresa:', empresa);  
        console.log('Senha Matriz:', empresa?.Matriz?.Senha);  
        const senhaCorreta = await comparePassword(senha, empresa.Matriz.Senha);

        if (!senhaCorreta) {
            throw new Error('Código ou senha incorretos.');
        }

        const token = generateToken({ id: empresa.id, codigo: empresa.Codigo });

        return { empresa, token };
    }
}

module.exports = LoginService;