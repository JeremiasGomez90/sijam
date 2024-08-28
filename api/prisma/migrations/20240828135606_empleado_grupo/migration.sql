-- AlterTable
ALTER TABLE `empleado` ADD COLUMN `grupoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Empleado` ADD CONSTRAINT `Empleado_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
