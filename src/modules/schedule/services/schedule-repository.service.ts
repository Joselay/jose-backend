import { PrismaService } from '@common/services';
import { CreateScheduleDto, UpdateScheduleDto } from '@modules/schedule/dto';
import { Injectable, Logger } from '@nestjs/common';
import { Day } from '@prisma/client';

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
    return this.prisma.timeSlot.upsert({
      where: {
        startTime_endTime: {
          startTime,
          endTime,
        },
      },
      update: {},
      create: {
        startTime,
        endTime,
      },
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
      },
      include: this.scheduleInclude,
    });
  }

  async findAllSchedules() {
    return this.prisma.schedule.findMany({
      include: this.scheduleInclude,
      orderBy: {
        timeSlot: {
          startTime: 'asc',
        },
      },
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
          startTime: 'asc',
        },
      },
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
