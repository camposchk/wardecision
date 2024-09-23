// hash.test.js

const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

test('Verificar se a senha bate com o hash', async () => {
    const senha = "banana";
    
    // Gerar o hash da senha
    const hash = await hashPassword(senha);
    console.log("Hash gerado:", hash);
    
    // Comparar a senha com o hash gerado
    const result = await comparePassword(senha, hash);
    
    expect(result).toBe(true);  // Verifica se a senha e o hash são compatíveis
});