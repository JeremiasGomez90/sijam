-- DropForeignKey
ALTER TABLE `empleado` DROP FOREIGN KEY `Empleado_plantaId_fkey`;

-- AlterTable
ALTER TABLE `empleado` ADD COLUMN `direccion` VARCHAR(191) NULL,
    MODIFY `plantaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Empleado` ADD CONSTRAINT `Empleado_plantaId_fkey` FOREIGN KEY (`plantaId`) REFERENCES `Planta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
