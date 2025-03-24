/*
  Warnings:

  - You are about to alter the column `shortener` on the `Link` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "shortener" SET DATA TYPE VARCHAR(10);
