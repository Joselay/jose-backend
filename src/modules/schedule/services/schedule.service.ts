import { CreateScheduleDto, UpdateScheduleDto } from '@modules/schedule/dto';
import { Schedule } from '@modules/schedule/entities';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Day, Prisma } from '@prisma/client';
import { ScheduleMapperService } from './schedule-mapper.service';
import { ScheduleRepositoryService } from './schedule-repository.service';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    private readonly repository: ScheduleRepositoryService,
    private readonly mapper: ScheduleMapperService,
  ) {}

  async createSchedule(data: CreateScheduleDto): Promise<Schedule> {
    try {
      const scheduleData = await this.repository.createSchedule(data);
      const schedule = this.mapper.mapPrismaToEntity(scheduleData);
      schedule.day = data.day;
      return schedule;
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
      const schedulesData = await this.repository.findAllSchedules();
      return this.mapper.mapPrismaArrayToEntities(schedulesData);
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
      const normalizedDay = day.toUpperCase();
      const validDays = this.mapper.getValidDays();

      if (!validDays.includes(normalizedDay)) {
        throw new NotFoundException(`Invalid day: ${day}`);
      }

      const schedulesData =
        await this.repository.findSchedulesByDay(normalizedDay);
      return this.mapper.mapPrismaArrayToEntities(schedulesData);
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

      const currentDay = this.mapper.mapDayIndexToDay(dayIndex);

      if (!currentDay) {
        return {
          message:
            'No class is currently in session (Sunday is not a school day)',
        };
      }

      // Format the current time as "HH:MM"
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;

      // Use the optimized repository method
      const scheduleData = await this.repository.findCurrentSchedule(
        currentDay as Day,
        currentTime,
      );

      if (scheduleData) {
        return this.mapper.mapPrismaToEntity(scheduleData);
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
      const scheduleData = await this.repository.findScheduleById(id);

      if (!scheduleData) {
        throw new NotFoundException(`Schedule with ID ${id} not found`);
      }

      return this.mapper.mapPrismaToEntity(scheduleData);
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
      const existingSchedule = await this.repository.findScheduleById(id);

      if (!existingSchedule) {
        throw new NotFoundException(`Schedule with ID ${id} not found`);
      }

      const updatedScheduleData = await this.repository.updateSchedule(
        id,
        data,
      );
      return this.mapper.mapPrismaToEntity(updatedScheduleData);
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
      const scheduleData = await this.repository.deleteSchedule(id);
      return this.mapper.mapPrismaToEntity(scheduleData);
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
