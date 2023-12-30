/*
  Warnings:

  - Made the column `number` on table `Request` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comment` on table `Request` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "number" SET NOT NULL,
ALTER COLUMN "comment" SET NOT NULL;
