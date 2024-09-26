//prisma connection
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class FilialService {
  async createFilial(data) {
    console.log(data);
    const idEmpresa = Number(data.ID_Empresa);
    const empresaExists = await prisma.empresa.findFirst({
      where: {
        ID: idEmpresa,
      },
    });

    if (!empresaExists) {
      throw new Error("Empresa não encontrada para associar filial.");
    }

    const haveComplement = data.complement ? data.complement : "";
    const dataAbertura = new Date(data.date);
    const uniqueCode = `FILIAL-${Date.now()}`;

    const filialData = {
      Nome: data.nameCompany,
      CNPJ: data.CNPJ,
      Data_Abertura: dataAbertura,
      Codigo: uniqueCode,
      Possui_Filial: false,
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
        {
          create: [{
            Codigo_Telefonico_Internacional: data.phoneCode,
            Telefone: data.phone,
            Email: data.email
          }]
        } : undefined,
      Filial: {
        create: {
          E_filial: true,
          Codigo: uniqueCode
        }
      }
    };

    // Log para depuração
    console.log("Dados para criação de filial:", filialData);

    // 3. Criar nova empresa (filial)
    const novaEmpresaFilial = await prisma.empresa.create({
      data: filialData,
    });

    // 4. Associar a nova empresa à matriz existente na tabela de filiais
    const createFilial = await prisma.filial.create({
      data: {
        ID_Empresa: novaEmpresaFilial.ID, // ID da nova empresa (filial)
        E_filial: true,
        Codigo: uniqueCode,
        Empresa: { connect: { ID: idEmpresa } }, // Conecta a filial à matriz
      },
    });

    return {
      matriz: empresaMatriz,
      filial: novaEmpresaFilial,
    };
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
