/*
  Warnings:

  - A unique constraint covering the columns `[CNPJ]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Empresa] ADD CONSTRAINT [Empresa_CNPJ_key] UNIQUE NONCLUSTERED ([CNPJ]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
