import { Day } from '@modules/schedule/constants';
import { Schedule } from '@modules/schedule/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleMapperService {
  mapPrismaToEntity(scheduleData: any): Schedule {
    const schedule = new Schedule();
    schedule.id = scheduleData.id;
    schedule.teacherName = scheduleData.teacher.name;
    schedule.room = scheduleData.room.number;
    schedule.startTime = scheduleData.timeSlot.startTime;
    schedule.endTime = scheduleData.timeSlot.endTime;
    schedule.day = this.mapPrismaDayToEnum(scheduleData.day);
    schedule.subject = scheduleData.subject.code;
    schedule.semester = scheduleData.semester;
    schedule.year = scheduleData.year;
    schedule.createdAt = scheduleData.createdAt;
    schedule.updatedAt = scheduleData.updatedAt;
    return schedule;
  }

  mapPrismaArrayToEntities(schedulesData: any[]): Schedule[] {
    return schedulesData.map((data) => this.mapPrismaToEntity(data));
  }

  mapPrismaDayToEnum(prismaDay: string): Day {
    const mapping: Record<string, Day> = {
      MONDAY: Day.MONDAY,
      TUESDAY: Day.TUESDAY,
      WEDNESDAY: Day.WEDNESDAY,
      THURSDAY: Day.THURSDAY,
      FRIDAY: Day.FRIDAY,
      SATURDAY: Day.SATURDAY,
    };
    return mapping[prismaDay];
  }

  getValidDays(): string[] {
    return ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  }

  mapDayIndexToDay(dayIndex: number): string | null {
    const dayMapping: Record<number, string> = {
      1: 'MONDAY',
      2: 'TUESDAY',
      3: 'WEDNESDAY',
      4: 'THURSDAY',
      5: 'FRIDAY',
      6: 'SATURDAY',
    };
    return dayMapping[dayIndex] || null;
  }
}
