import {
  Day,
  findTimeSlotByStartTime,
  mapTimeToPeriod,
  TIME_SLOTS,
} from '@modules/schedule/constants';
import { ApiProperty } from '@nestjs/swagger';
import { TimeSlotEnum } from '@prisma/client';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class Schedule {
  @ApiProperty({
    description: 'Unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The name of the teacher',
    example: 'Heng Phillipe',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  teacherName: string;

  @ApiProperty({
    description: 'The classroom identifier',
    example: '3A',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  room: string;

  @ApiProperty({
    description: 'Start time in 24-hour format (HH:MM)',
    example: '5:45',
    enum: TIME_SLOTS.map((slot) => slot.startTime),
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({
    description: 'End time in 24-hour format (HH:MM)',
    example: '6:45',
    enum: TIME_SLOTS.map((slot) => slot.endTime),
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({
    description: 'Day of the week in lowercase',
    example: 'monday',
    enum: Day,
  })
  @Expose()
  @IsEnum(Day)
  day: Day;

  @ApiProperty({
    description: 'The subject name',
    example: 'Mathematics',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'The semester',
    example: '1',
    required: false,
  })
  @Expose()
  @IsString()
  @IsOptional()
  semester?: string;

  @ApiProperty({
    description: 'The academic year',
    example: '2025',
    required: false,
  })
  @Expose()
  @IsString()
  @IsOptional()
  year?: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-05-18T10:30:00Z',
  })
  @Expose()
  @Type(() => Date)
  @IsDate()
  @Transform(({ value }) => value && new Date(value).toISOString())
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-05-18T10:30:00Z',
  })
  @Expose()
  @Type(() => Date)
  @IsDate()
  @Transform(({ value }) => value && new Date(value).toISOString())
  updatedAt: Date;

  static fromPrisma(prismaData: any): Schedule {
    const schedule = new Schedule();
    Object.assign(schedule, prismaData);
    return schedule;
  }

  static fromPrismaArray(prismaData: any[]): Schedule[] {
    return prismaData.map((data) => Schedule.fromPrisma(data));
  }

  getDuration(): number {
    const startParts = this.startTime.split(':').map(Number);
    const endParts = this.endTime.split(':').map(Number);

    const startMinutes = startParts[0] * 60 + startParts[1];
    const endMinutes = endParts[0] * 60 + endParts[1];

    return endMinutes - startMinutes;
  }

  getTimeSlot() {
    return findTimeSlotByStartTime(this.startTime);
  }

  getPeriodEnum(): TimeSlotEnum {
    return mapTimeToPeriod(this.startTime);
  }

  getPeriodLabel(): string | undefined {
    const timeSlot = this.getTimeSlot();
    return timeSlot?.label;
  }

  isInSession(currentTime?: Date): boolean {
    const now = currentTime || new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const dayIndex = now.getDay();

    const dayMapping = {
      1: Day.MONDAY,
      2: Day.TUESDAY,
      3: Day.WEDNESDAY,
      4: Day.THURSDAY,
      5: Day.FRIDAY,
      6: Day.SATURDAY,
    };

    const currentDay = dayMapping[dayIndex as keyof typeof dayMapping];

    if (!currentDay || currentDay !== this.day) {
      return false;
    }

    const currentTimeMinutes = currentHour * 60 + currentMinutes;
    const startTimeParts = this.startTime.split(':').map(Number);
    const endTimeParts = this.endTime.split(':').map(Number);
    const startTimeMinutes = startTimeParts[0] * 60 + startTimeParts[1];
    const endTimeMinutes = endTimeParts[0] * 60 + endTimeParts[1];

    return (
      currentTimeMinutes >= startTimeMinutes &&
      currentTimeMinutes <= endTimeMinutes
    );
  }

  startsAfter(otherSchedule: Schedule): boolean {
    const thisStartParts = this.startTime.split(':').map(Number);
    const otherEndParts = otherSchedule.endTime.split(':').map(Number);

    const thisStartMinutes = thisStartParts[0] * 60 + thisStartParts[1];
    const otherEndMinutes = otherEndParts[0] * 60 + otherEndParts[1];

    return thisStartMinutes > otherEndMinutes;
  }

  getTimeRangeFormatted(): string {
    return `${this.startTime} - ${this.endTime}`;
  }
}
