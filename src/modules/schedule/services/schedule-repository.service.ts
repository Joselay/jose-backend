import { PrismaService } from '@common/services';
import { CreateScheduleDto, UpdateScheduleDto } from '@modules/schedule/dto';
import { Injectable, Logger } from '@nestjs/common';
import { Day, TimeSlotEnum } from '@prisma/client';

@Injectable()
export class ScheduleRepositoryService {
  private readonly logger = new Logger(ScheduleRepositoryService.name);

  constructor(private readonly prisma: PrismaService) {}

  private readonly scheduleInclude = {
    teacher: true,
    room: true,
    subject: true,
    timeSlot: true,
  };

  // Convert time to period enum for more efficient querying
  private mapTimeToPeriod(startTime: string): TimeSlotEnum {
    switch (startTime) {
      case '5:45':
        return TimeSlotEnum.FIRST_PERIOD;
      case '6:45':
        return TimeSlotEnum.SECOND_PERIOD;
      case '7:45':
        return TimeSlotEnum.THIRD_PERIOD;
      default:
        this.logger.warn(
          `Unknown start time: ${startTime}, defaulting to FIRST_PERIOD`,
        );
        return TimeSlotEnum.FIRST_PERIOD;
    }
  }

  async findOrCreateTeacher(name: string) {
    return this.prisma.teacher.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  async findOrCreateRoom(number: string) {
    return this.prisma.room.upsert({
      where: { number },
      update: {},
      create: { number },
    });
  }

  async findOrCreateSubject(code: string, name?: string) {
    return this.prisma.subject.upsert({
      where: { code },
      update: {},
      create: { code, name: name || code },
    });
  }

  async findOrCreateTimeSlot(startTime: string, endTime: string) {
    const period = this.mapTimeToPeriod(startTime);

    return this.prisma.timeSlot.upsert({
      where: {
        startTime_endTime: {
          startTime,
          endTime,
        },
      },
      update: {
        period, // Ensure period is up to date
      },
      create: {
        startTime,
        endTime,
        period,
      },
    });
  }

  // Find time slot by period (more efficient than by startTime/endTime)
  async findTimeSlotByPeriod(period: TimeSlotEnum) {
    return this.prisma.timeSlot.findFirst({
      where: { period },
    });
  }

  async createSchedule(data: CreateScheduleDto) {
    const teacher = await this.findOrCreateTeacher(data.teacherName);
    const room = await this.findOrCreateRoom(data.room);
    const subject = await this.findOrCreateSubject(data.subject);
    const timeSlot = await this.findOrCreateTimeSlot(
      data.startTime,
      data.endTime,
    );

    return this.prisma.schedule.create({
      data: {
        teacher: { connect: { id: teacher.id } },
        room: { connect: { id: room.id } },
        subject: { connect: { id: subject.id } },
        timeSlot: { connect: { id: timeSlot.id } },
        day: data.day.toUpperCase() as Day,
        semester: data.semester,
        year: data.year,
      },
      include: this.scheduleInclude,
    });
  }

  async findAllSchedules() {
    return this.prisma.schedule.findMany({
      include: this.scheduleInclude,
      orderBy: [
        { day: 'asc' },
        {
          timeSlot: {
            period: 'asc',
          },
        },
      ],
    });
  }

  async findSchedulesByDay(day: string) {
    return this.prisma.schedule.findMany({
      where: {
        day: day as Day,
      },
      include: this.scheduleInclude,
      orderBy: {
        timeSlot: {
          period: 'asc', // More efficient sorting by enum
        },
      },
    });
  }

  async findCurrentSchedule(day: Day, currentTime: string) {
    // Extract hours and minutes from current time (format: HH:MM)
    const [hours, minutes] = currentTime.split(':').map(Number);

    // Determine which period we're in
    let period: TimeSlotEnum;

    if (hours < 6 || (hours === 6 && minutes < 45)) {
      period = TimeSlotEnum.FIRST_PERIOD;
    } else if (hours < 7 || (hours === 7 && minutes < 45)) {
      period = TimeSlotEnum.SECOND_PERIOD;
    } else {
      period = TimeSlotEnum.THIRD_PERIOD;
    }

    return this.prisma.schedule.findFirst({
      where: {
        day,
        timeSlot: {
          period,
        },
      },
      include: this.scheduleInclude,
    });
  }

  async findScheduleById(id: string) {
    return this.prisma.schedule.findUnique({
      where: { id },
      include: this.scheduleInclude,
    });
  }

  async updateSchedule(id: string, data: UpdateScheduleDto) {
    const updateData: any = {};

    if (data.teacherName) {
      const teacher = await this.findOrCreateTeacher(data.teacherName);
      updateData.teacher = { connect: { id: teacher.id } };
    }

    if (data.room) {
      const room = await this.findOrCreateRoom(data.room);
      updateData.room = { connect: { id: room.id } };
    }

    if (data.subject) {
      const subject = await this.findOrCreateSubject(data.subject);
      updateData.subject = { connect: { id: subject.id } };
    }

    if (data.startTime && data.endTime) {
      const timeSlot = await this.findOrCreateTimeSlot(
        data.startTime,
        data.endTime,
      );
      updateData.timeSlot = { connect: { id: timeSlot.id } };
    }

    if (data.day) {
      updateData.day = data.day.toUpperCase() as Day;
    }

    if (data.semester) {
      updateData.semester = data.semester;
    }

    if (data.year) {
      updateData.year = data.year;
    }

    return this.prisma.schedule.update({
      where: { id },
      data: updateData,
      include: this.scheduleInclude,
    });
  }

  async deleteSchedule(id: string) {
    return this.prisma.schedule.delete({
      where: { id },
      include: this.scheduleInclude,
    });
  }
}
