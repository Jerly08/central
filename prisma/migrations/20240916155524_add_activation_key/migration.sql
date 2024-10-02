-- CreateTable
CREATE TABLE `ActivationKey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `company_id` INTEGER NOT NULL,

    UNIQUE INDEX `ActivationKey_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ActivationKey` ADD CONSTRAINT `ActivationKey_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
