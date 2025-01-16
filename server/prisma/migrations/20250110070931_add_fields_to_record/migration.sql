/*
  Warnings:

  - Added the required column `type` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Record` ADD COLUMN `classification` VARCHAR(191) NULL,
    ADD COLUMN `json` JSON NULL,
    ADD COLUMN `nature` VARCHAR(191) NULL,
    ADD COLUMN `requester` VARCHAR(191) NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
