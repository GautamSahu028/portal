/*
  Warnings:

  - You are about to drop the column `code` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the `Announcement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Semester` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SemesterGrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentCourse` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subjectId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Semester" DROP CONSTRAINT "Semester_studentId_fkey";

-- DropForeignKey
ALTER TABLE "SemesterGrade" DROP CONSTRAINT "SemesterGrade_courseId_fkey";

-- DropForeignKey
ALTER TABLE "SemesterGrade" DROP CONSTRAINT "SemesterGrade_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_studentId_fkey";

-- DropIndex
DROP INDEX "Course_code_key";

-- DropIndex
DROP INDEX "Faculty_employeeId_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "code",
DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "subjectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Faculty" DROP COLUMN "employeeId";

-- DropTable
DROP TABLE "Announcement";

-- DropTable
DROP TABLE "Semester";

-- DropTable
DROP TABLE "SemesterGrade";

-- DropTable
DROP TABLE "StudentCourse";

-- DropEnum
DROP TYPE "Grade";

-- CreateTable
CREATE TABLE "StudentSubject" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "StudentSubject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentSubject_studentId_subjectId_key" ON "StudentSubject"("studentId", "subjectId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubject" ADD CONSTRAINT "StudentSubject_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubject" ADD CONSTRAINT "StudentSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
