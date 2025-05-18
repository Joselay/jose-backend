/*
  Warnings:

  - You are about to alter the column `number` on the `rooms` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `building` on the `rooms` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `capacity` on the `rooms` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `semester` on the `schedules` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `year` on the `schedules` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `code` on the `subjects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `name` on the `subjects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `creditHours` on the `subjects` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `name` on the `teachers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `startTime` on the `time_slots` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.
  - You are about to alter the column `endTime` on the `time_slots` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.

*/
-- DropIndex
DROP INDEX "time_slots_startTime_endTime_idx";

-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "number" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "building" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "capacity" SET DATA TYPE SMALLINT;

-- AlterTable
ALTER TABLE "schedules" ALTER COLUMN "semester" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "year" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "subjects" ALTER COLUMN "code" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "creditHours" SET DATA TYPE SMALLINT;

-- AlterTable
ALTER TABLE "teachers" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "time_slots" ALTER COLUMN "startTime" SET DATA TYPE VARCHAR(5),
ALTER COLUMN "endTime" SET DATA TYPE VARCHAR(5);

-- CreateIndex
CREATE INDEX "time_slots_period_idx" ON "time_slots"("period");
