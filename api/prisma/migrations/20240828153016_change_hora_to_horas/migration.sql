/*
  Warnings:

  - You are about to drop the `hora` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `hora` DROP FOREIGN KEY `Hora_adicionalId_fkey`;

-- DropForeignKey
ALTER TABLE `hora` DROP FOREIGN KEY `Hora_empleadoId_fkey`;

-- DropTable
DROP TABLE `hora`;

-- CreateTable
CREATE TABLE `Horas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` DECIMAL(9, 2) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `empleadoId` INTEGER NOT NULL,
    `adicionalId` INTEGER NOT NULL,
    `baja` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Horas` ADD CONSTRAINT `Horas_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `Empleado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horas` ADD CONSTRAINT `Horas_adicionalId_fkey` FOREIGN KEY (`adicionalId`) REFERENCES `Adicional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
