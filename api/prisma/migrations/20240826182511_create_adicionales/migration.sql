-- CreateTable
CREATE TABLE `Adicional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` VARCHAR(191) NOT NULL,
    `grupoId` INTEGER NOT NULL,
    `novedadReferenciaId` INTEGER NOT NULL,
    `baja` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Adicional_valor_key`(`valor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fichada` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plantaId` INTEGER NULL,
    `nombre_archivo` VARCHAR(191) NOT NULL,
    `baja` BOOLEAN NOT NULL DEFAULT false,
    `fecha_subida` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Adicional` ADD CONSTRAINT `Adicional_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adicional` ADD CONSTRAINT `Adicional_novedadReferenciaId_fkey` FOREIGN KEY (`novedadReferenciaId`) REFERENCES `NovedadesReferencias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fichada` ADD CONSTRAINT `Fichada_plantaId_fkey` FOREIGN KEY (`plantaId`) REFERENCES `Planta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
