-- AlterTable
ALTER TABLE `empleado` ADD COLUMN `baja` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `novedad` ADD COLUMN `baja` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `planta` ADD COLUMN `baja` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `referencia` ADD COLUMN `baja` BOOLEAN NOT NULL DEFAULT false;
