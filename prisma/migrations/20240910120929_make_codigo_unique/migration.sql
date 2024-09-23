/*
  Warnings:

  - A unique constraint covering the columns `[Codigo]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - Made the column `Codigo` on table `Empresa` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Empresa] ALTER COLUMN [Codigo] VARCHAR(100) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Empresa] ADD CONSTRAINT [Empresa_Codigo_key] UNIQUE NONCLUSTERED ([Codigo]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
