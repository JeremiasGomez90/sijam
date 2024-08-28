/*
  Warnings:

  - You are about to alter the column `valor` on the `adicional` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(9,2)`.

*/
-- DropIndex
DROP INDEX `Adicional_valor_key` ON `adicional`;

-- AlterTable
ALTER TABLE `adicional` MODIFY `valor` DECIMAL(9, 2) NOT NULL;
