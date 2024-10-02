/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - The required column `token` was added to the `Company` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `company` ADD COLUMN `token` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Company_token_key` ON `Company`(`token`);
