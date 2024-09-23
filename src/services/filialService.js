//prisma connection
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class FilialService {
  async createFilial(data) {
    const empresaExists = await prisma.empresa.findUnique({
      where: {
        ID: data.ID_Empresa,
      },
    });

    if (!empresaExists) {
      throw new Error("Empresa não encontrada para associar filial.");
    }

    const uniqueCode = `FILIAL-${Date.now()}`;

    const filialData = {
      ID_Empresa: data.ID_Empresa,
      E_filial: true,
      Codigo: uniqueCode,
    };

    // Prepara o objeto para criação
    if (data.CEP) {
      filialData.Endereco = {
        create: {
          CEP: data.CEP,
          Estado: data.state,
          Cidade: data.city,
          Bairro: data.neighborhood,
          Logradouro: data.street,
          Numero: data.number,
          Complemento: data.complement || "",
        },
      };
    }

    // Log para depuração
    console.log("Dados para criação de filial:", filialData);

    const createFilial = await prisma.filial.create({
      data: filialData,
    });

    return createFilial;
  }

  async getFilialById(id) {
    return prisma.filial.findUnique({
      where: { ID: parseInt(id) },
      include: {
        Empresa: true,
        Endereco: true,
      },
    });
  }

  async updateFilial(id, data) {
    const filialExists = await prisma.filial.findUnique({
      where: { ID: parseInt(id) },
    });

    if (!filialExists) {
      throw new Error("Filial não encontrada.");
    }

    return prisma.filial.update({
      where: { ID: parseInt(id) },
      data,
    });
  }

  async deleteFilial(id) {
    const filial = await prisma.filial.findUnique({
      where: { ID: parseInt(id) },
    });

    if (!filial) {
      throw new Error("Filial não encontrada.");
    }

    return prisma.filial.delete({
      where: { ID: parseInt(id) },
    });
  }
}

module.exports = FilialService;
