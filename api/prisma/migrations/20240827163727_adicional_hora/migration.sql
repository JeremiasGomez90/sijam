/*
  Warnings:

  - Added the required column `adicionalId` to the `Hora` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hora` ADD COLUMN `adicionalId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Hora` ADD CONSTRAINT `Hora_adicionalId_fkey` FOREIGN KEY (`adicionalId`) REFERENCES `Adicional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
