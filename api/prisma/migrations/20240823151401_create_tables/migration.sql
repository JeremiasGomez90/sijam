/*
  Warnings:

  - You are about to drop the column `plantaId` on the `empleado` table. All the data in the column will be lost.
  - Added the required column `codigo` to the `Referencia` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `empleado` DROP FOREIGN KEY `Empleado_plantaId_fkey`;

-- AlterTable
ALTER TABLE `empleado` DROP COLUMN `plantaId`;

-- AlterTable
ALTER TABLE `referencia` ADD COLUMN `codigo` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Contrato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `plantaId` INTEGER NOT NULL,
    `baja` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `contratoId` INTEGER NOT NULL,
    `baja` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_plantaId_fkey` FOREIGN KEY (`plantaId`) REFERENCES `Planta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contrato`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
