//prisma connection
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { hashPassword } = require('../config/auth');

class EmpresaService {
  async createEmpresa(data) {
    console.log(data)
    const matrizExists = await prisma.matriz.findFirst({
      where: {
        Empresa: {
          CNPJ: data.CNPJ,
        }
      }
    });

    if (!matrizExists) {
      data.matriz = {
        E_matriz: true,
        Senha: data.Senha,
      };
    } else {
      if (data.matriz) {
        throw new Error('Já existe uma matriz registrada com esse CNPJ. Esta empresa deve ser uma filial.');
      }
    }

    
    const haveComplement = data.complement ? data.complement : "";
    const hashedPassword = await hashPassword(data.password);
    const haveFilial = data.filials ? true : false;
    const dataAbertura = new Date(data.date);
    const uniqueCode = `EMP-${Date.now()}`;

    // Prepara o objeto de dados para a criação
    const empresaData = {
      Nome: data.nameCompany,
      CNPJ: data.CNPJ,
      Possui_Filial: haveFilial,
      Data_Abertura: dataAbertura,
      Codigo: uniqueCode,
      Endereco: data.CEP ? {
        create: [{
          CEP: data.CEP,
          Estado: data.state,
          Cidade: data.city,
          Bairro: data.neighborhood,
          Logradouro: data.street,
          Numero: data.number,
          Complemento: haveComplement
        }]
      } : undefined,
      Contato: data.phoneCode ? 
      { create: [{
          Codigo_Telefonico_Internacional: data.phoneCode,
          Telefone: data.phone,
          Email: data.email
      }]
      } : undefined,
      Matriz: data.matriz ? {
        create: {
          E_matriz: true,
          Senha: hashedPassword,
        },
      } : undefined,
      Filiais: data.filiais ? { create: data.filiais } : undefined,
    };

    // Log para depuração
    console.log("Dados para criação de empresa:", empresaData);

    const createEmpresa = await prisma.empresa.create({
      data: empresaData,
    });

    return createEmpresa;
  }

  async getEmpresaById(id) {
    return prisma.empresa.findUnique({
      where: { id: parseInt(id) },
      incluse: {
        Enderecos: true,
        Contatos: true,
        Matriz: true,
        Filiais: true,
      },
    });
  }

  async updateEmpresa(id, data) {
    const currentEmpresa = await prisma.empresa.findUnique({
      where: { id: parseInt(id) },
      include: { Matriz: true },
    });

    if (currentEmpresa.matriz) {
      if (data.matriz && data.matriz.E_matriz === false) {
        throw new Error("Não é permitido desmarcar uma matriz");
      }
    }
    else {
      if (data.matriz && data.matriz.E_matriz === true) {
        throw new Error("Não é permitido converter uma filiar em matriz");
      }
    }

    return prisma.empresa.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteEmpresa(id) {
    const empresa = await prisma.empresa.findUnique({
      where: { id: parseInt(id) },
      include: { Matriz: true },
    });

    if (empresa.matriz) {
      throw new Error("A matriz não pode ser deletada");
    }

    return prisma.empresa.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = EmpresaService;
