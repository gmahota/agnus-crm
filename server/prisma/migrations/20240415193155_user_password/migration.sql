/*
  Warnings:

  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `phoneNumber` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;
