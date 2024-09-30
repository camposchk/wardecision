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
      Possui_Filial: false,
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
        {
          create: [{
            Codigo_Telefonico_Internacional: data.phoneCode,
            Telefone: data.phone,
            Email: data.email
          }]
        } : undefined,
      Filial: {
        create: {
          //ID_Empresa: idEmpresa,
          E_filial: true,
          Codigo: uniqueCode,
        }
      }
    };

    // Log para depuração
    console.log("Dados para criação de filial:", filialData);

    const novaEmpresaFilial = await prisma.empresa.create({
      data: filialData,
    });

    return {
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

  async getAllFiliais() {
    const filiais = await prisma.filial.findMany({
      include: {
        Empresa: true,
      },
    })
    return filiais;
  }

  async updateFilial(id, data) {
    console.log('Atualizando filial com ID:', id);
    console.log('Dados recebidos no serviço para atualização:', data);

    // Verificando se a filial existe antes de atualizar
    const filialExists = await prisma.filial.findFirst({
      where: { ID: parseInt(id) },
    });

    if (!filialExists) {
      throw new Error("Filial não encontrada.");
    }

    try {
      // Atualizando os dados da filial
      const filialAtualizada = await prisma.filial.update({
        where: { ID: parseInt(id) },
        data: {
          Empresa: {
            update: data,  // Certifique-se que a estrutura de 'data' está correta
          },
        },
      });

      console.log('Filial atualizada com sucesso:', filialAtualizada);
      return filialAtualizada;
    } catch (error) {
      // Captura e lança o erro no log
      console.log('Erro no serviço de atualização de filial:', error.message);
      throw new Error(`Erro ao atualizar filial: ${error.message}`);
    }
  }

  async deleteFilial(id) {
    // Verificando se a filial existe antes de deletar
    const filial = await prisma.filial.findFirst({
      where: { ID: parseInt(id) },
    });

    if (!filial) {
      throw new Error("Filial não encontrada.");
    }

    try {
      // Excluindo a filial
      const result = await prisma.filial.delete({
        where: { ID: parseInt(id) },
      });

      console.log('Filial excluída com sucesso:', result);
      return result;
    } catch (error) {
      // Captura e lança o erro no log
      console.log('Erro ao deletar filial no serviço:', error.message);
      throw new Error(`Erro ao deletar filial: ${error.message}`);
    }
  }
}

module.exports = FilialService;
