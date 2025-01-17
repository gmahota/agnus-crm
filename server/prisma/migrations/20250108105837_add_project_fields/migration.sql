/*
  Warnings:

  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` ADD COLUMN `budget` DOUBLE NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dateBegin` DATETIME(3) NULL,
    ADD COLUMN `dateEnd` DATETIME(3) NULL,
    ADD COLUMN `owner` VARCHAR(100) NULL,
    ADD COLUMN `previewDateEnd` DATETIME(3) NULL,
    ADD COLUMN `previewDateStart` DATETIME(3) NULL,
    ADD COLUMN `priority` VARCHAR(20) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `json` VARCHAR(191) NULL;
