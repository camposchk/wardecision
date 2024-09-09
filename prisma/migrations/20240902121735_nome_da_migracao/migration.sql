BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Contato] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [ID_Empresa] INT NOT NULL,
    [Telefone] VARCHAR(100),
    [Codigo_Telefonico_Internacional] VARCHAR(100),
    [Email] VARCHAR(100),
    CONSTRAINT [Contato_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[Dados_Treino] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [ID_Empresa] INT NOT NULL,
    [Data] DATETIME2 NOT NULL,
    [Rotulos] NVARCHAR(1000),
    [Dados] NVARCHAR(1000),
    CONSTRAINT [Dados_Treino_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[Decisao] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [ID_Modelo_ML] INT NOT NULL,
    [Data] DATETIME2 NOT NULL,
    [Saida] NVARCHAR(1000),
    CONSTRAINT [Decisao_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[Empresa] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [Nome] NVARCHAR(1000) NOT NULL,
    [CNPJ] VARCHAR(20) NOT NULL,
    [Possui_Filial] BIT NOT NULL,
    [Data_Abertura] DATETIME2,
    [Codigo] VARCHAR(100),
    CONSTRAINT [Empresa_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[Endereco] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [ID_Empresa] INT NOT NULL,
    [CEP] VARCHAR(20),
    [Estado] VARCHAR(100),
    [Cidade] VARCHAR(100),
    [Bairro] VARCHAR(100),
    [Logradouro] VARCHAR(100),
    [Numero] VARCHAR(100),
    [Complemento] VARCHAR(100),
    CONSTRAINT [Endereco_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[Filial] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [ID_Empresa] INT NOT NULL,
    [E_filial] BIT NOT NULL,
    [Codigo] VARCHAR(100),
    CONSTRAINT [Filial_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[Matriz] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [ID_Empresa] INT NOT NULL,
    [E_matriz] BIT NOT NULL,
    [Senha] VARCHAR(100) NOT NULL,
    CONSTRAINT [Matriz_pkey] PRIMARY KEY CLUSTERED ([ID]),
    CONSTRAINT [Matriz_ID_Empresa_key] UNIQUE NONCLUSTERED ([ID_Empresa])
);

-- CreateTable
CREATE TABLE [dbo].[Modelo_Machine_Learning] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [ID_Dados] INT NOT NULL,
    [Data] DATETIME2 NOT NULL,
    [Parametros] NVARCHAR(1000),
    CONSTRAINT [Modelo_Machine_Learning_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Contato] ADD CONSTRAINT [Contato_ID_Empresa_fkey] FOREIGN KEY ([ID_Empresa]) REFERENCES [dbo].[Empresa]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dados_Treino] ADD CONSTRAINT [Dados_Treino_ID_Empresa_fkey] FOREIGN KEY ([ID_Empresa]) REFERENCES [dbo].[Empresa]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Decisao] ADD CONSTRAINT [Decisao_ID_Modelo_ML_fkey] FOREIGN KEY ([ID_Modelo_ML]) REFERENCES [dbo].[Modelo_Machine_Learning]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Endereco] ADD CONSTRAINT [Endereco_ID_Empresa_fkey] FOREIGN KEY ([ID_Empresa]) REFERENCES [dbo].[Empresa]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Filial] ADD CONSTRAINT [Filial_ID_Empresa_fkey] FOREIGN KEY ([ID_Empresa]) REFERENCES [dbo].[Empresa]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Matriz] ADD CONSTRAINT [Matriz_ID_Empresa_fkey] FOREIGN KEY ([ID_Empresa]) REFERENCES [dbo].[Empresa]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Modelo_Machine_Learning] ADD CONSTRAINT [Modelo_Machine_Learning_ID_Dados_fkey] FOREIGN KEY ([ID_Dados]) REFERENCES [dbo].[Dados_Treino]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
