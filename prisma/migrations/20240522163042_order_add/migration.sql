/*
  Warnings:

  - You are about to drop the column `createdAt` on the `productsale` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `productsale` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the `state` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `discount` to the `ProductSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodId` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `Sale_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `Sale_stateId_fkey`;

-- AlterTable
ALTER TABLE `productsale` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `discount` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `sale` DROP COLUMN `discount`,
    DROP COLUMN `stateId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `paymentMethodId` INTEGER NOT NULL,
    ADD COLUMN `statusId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `isCancel` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `clientId` INTEGER NULL;

-- DropTable
DROP TABLE `state`;

-- CreateTable
CREATE TABLE `PaymentMethod` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `PaymentMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
