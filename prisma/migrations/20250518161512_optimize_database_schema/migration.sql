-- CreateEnum
CREATE TYPE "TimeSlotEnum" AS ENUM ('FIRST_PERIOD', 'SECOND_PERIOD', 'THIRD_PERIOD');

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_roomId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_timeSlotId_fkey";

-- DropIndex
DROP INDEX "schedules_day_idx";

-- DropIndex
DROP INDEX "schedules_roomId_idx";

-- DropIndex
DROP INDEX "schedules_subjectId_idx";

-- DropIndex
DROP INDEX "schedules_teacherId_idx";

-- DropIndex
DROP INDEX "schedules_timeSlotId_idx";

-- AlterTable
ALTER TABLE "time_slots" ADD COLUMN     "period" "TimeSlotEnum" NOT NULL DEFAULT 'FIRST_PERIOD';

-- CreateIndex
CREATE INDEX "schedules_day_timeSlotId_idx" ON "schedules"("day", "timeSlotId");

-- CreateIndex
CREATE INDEX "schedules_teacherId_day_idx" ON "schedules"("teacherId", "day");

-- CreateIndex
CREATE INDEX "schedules_roomId_day_idx" ON "schedules"("roomId", "day");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "time_slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
