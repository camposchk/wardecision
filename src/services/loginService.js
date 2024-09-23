const { comparePassword, generateToken } = require('../config/auth');
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

        // if (!senha || !empresa.Matriz.senha) {
        //     throw new Error('Senha inválida.');
        //   }

        console.log('Empresa:', empresa);  
        console.log('Senha Matriz:', empresa.Matriz.Senha);  

        const senhaCorreta = await comparePassword(senha.trim(), empresa.Matriz.Senha);

        console.log("variavel senha correta:",senhaCorreta)

        if (!senhaCorreta) {
            throw new Error('Código ou senha incorretos.');
        }

        const token = generateToken({ id: empresa.id, codigo: empresa.Codigo });
            console.log(token, " --> TOKEN")
        return { empresa, token };
    }
}

module.exports = LoginService;