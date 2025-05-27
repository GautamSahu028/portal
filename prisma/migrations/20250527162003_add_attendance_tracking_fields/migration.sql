/*
  Warnings:

  - A unique constraint covering the columns `[studentId,courseId,date]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "totalClassesTillDate" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "totalPresentTillDate" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_studentId_courseId_date_key" ON "Attendance"("studentId", "courseId", "date");
