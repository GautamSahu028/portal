/*
  Warnings:

  - You are about to drop the column `totalClassesTillDate` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `totalPresentTillDate` on the `Attendance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "totalClassesTillDate",
DROP COLUMN "totalPresentTillDate";
