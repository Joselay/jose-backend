/*
  Warnings:

  - You are about to drop the column `endTime` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `teacherName` on the `schedules` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomId,timeSlotId,day]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherId,timeSlotId,day]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSlotId` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `day` on the `schedules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "endTime",
DROP COLUMN "room",
DROP COLUMN "startTime",
DROP COLUMN "subject",
DROP COLUMN "teacherName",
ADD COLUMN     "roomId" TEXT NOT NULL,
ADD COLUMN     "semester" TEXT,
ADD COLUMN     "subjectId" TEXT NOT NULL,
ADD COLUMN     "teacherId" TEXT NOT NULL,
ADD COLUMN     "timeSlotId" TEXT NOT NULL,
ADD COLUMN     "year" TEXT,
DROP COLUMN "day",
ADD COLUMN     "day" "Day" NOT NULL;

-- CreateTable
CREATE TABLE "teachers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "building" TEXT,
    "capacity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creditHours" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_slots" (
    "id" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_slots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teachers_name_key" ON "teachers"("name");

-- CreateIndex
CREATE INDEX "teachers_name_idx" ON "teachers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_number_key" ON "rooms"("number");

-- CreateIndex
CREATE INDEX "rooms_number_idx" ON "rooms"("number");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_code_key" ON "subjects"("code");

-- CreateIndex
CREATE INDEX "subjects_code_idx" ON "subjects"("code");

-- CreateIndex
CREATE INDEX "time_slots_startTime_endTime_idx" ON "time_slots"("startTime", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "time_slots_startTime_endTime_key" ON "time_slots"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "schedules_day_idx" ON "schedules"("day");

-- CreateIndex
CREATE INDEX "schedules_teacherId_idx" ON "schedules"("teacherId");

-- CreateIndex
CREATE INDEX "schedules_roomId_idx" ON "schedules"("roomId");

-- CreateIndex
CREATE INDEX "schedules_timeSlotId_idx" ON "schedules"("timeSlotId");

-- CreateIndex
CREATE INDEX "schedules_subjectId_idx" ON "schedules"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_roomId_timeSlotId_day_key" ON "schedules"("roomId", "timeSlotId", "day");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_teacherId_timeSlotId_day_key" ON "schedules"("teacherId", "timeSlotId", "day");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "time_slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
