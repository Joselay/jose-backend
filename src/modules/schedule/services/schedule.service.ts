import { PrismaService } from '@common/services';
import { Day } from '@modules/schedule/constants';
import { CreateScheduleDto, UpdateScheduleDto } from '@modules/schedule/dto';
import { Schedule } from '@modules/schedule/entities';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createSchedule(data: CreateScheduleDto): Promise<Schedule> {
    try {
      const scheduleData = await this.prisma.schedule.create({
        data,
      });

      return Schedule.fromPrisma(scheduleData);
    } catch (error) {
      this.logger.error(
        `Failed to create schedule: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create schedule');
    }
  }

  async getFullSchedule(): Promise<Schedule[]> {
    try {
      const schedulesData = await this.prisma.schedule.findMany({
        orderBy: { startTime: 'asc' },
      });
      return Schedule.fromPrismaArray(schedulesData);
    } catch (error) {
      this.logger.error(
        `Failed to get full schedule: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve schedule data',
      );
    }
  }

  async getScheduleByDay(day: string): Promise<Schedule[]> {
    try {
      const normalizedDay = day.toLowerCase();
      if (!Object.values(Day).includes(normalizedDay as Day)) {
        throw new NotFoundException(`Invalid day: ${day}`);
      }

      const schedulesData = await this.prisma.schedule.findMany({
        where: {
          day: normalizedDay,
        },
        orderBy: { startTime: 'asc' },
      });

      return Schedule.fromPrismaArray(schedulesData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to get schedule by day: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to retrieve schedule data for day: ${day}`,
      );
    }
  }

  async getCurrentClass(): Promise<Schedule | { message: string }> {
    try {
      const now = new Date();

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

      if (!currentDay) {
        return {
          message: 'No class is currently in session (Sunday has no schedule)',
        };
      }

      const todayClassesData = await this.prisma.schedule.findMany({
        where: {
          day: currentDay,
        },
        orderBy: { startTime: 'asc' },
      });

      const schedules = Schedule.fromPrismaArray(todayClassesData);

      const currentClass = schedules.find((schedule) =>
        schedule.isInSession(now),
      );

      if (currentClass) {
        return currentClass;
      }

      return { message: 'No class is currently in session' };
    } catch (error) {
      this.logger.error(
        `Failed to get current class: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Failed to determine current class',
      );
    }
  }

  async getScheduleById(id: string): Promise<Schedule> {
    try {
      const scheduleData = await this.prisma.schedule.findUnique({
        where: { id },
      });

      if (!scheduleData) {
        throw new NotFoundException(`Schedule with ID ${id} not found`);
      }

      return Schedule.fromPrisma(scheduleData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to get schedule by ID: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to retrieve schedule with ID: ${id}`,
      );
    }
  }

  async updateSchedule(id: string, data: UpdateScheduleDto): Promise<Schedule> {
    try {
      const scheduleData = await this.prisma.schedule.update({
        where: { id },
        data,
      });

      return Schedule.fromPrisma(scheduleData);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Schedule with ID ${id} not found`);
      }
      this.logger.error(
        `Failed to update schedule: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to update schedule with ID: ${id}`,
      );
    }
  }

  async deleteSchedule(id: string): Promise<Schedule> {
    try {
      const scheduleData = await this.prisma.schedule.delete({
        where: { id },
      });

      return Schedule.fromPrisma(scheduleData);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Schedule with ID ${id} not found`);
      }
      this.logger.error(
        `Failed to delete schedule: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to delete schedule with ID: ${id}`,
      );
    }
  }
}
