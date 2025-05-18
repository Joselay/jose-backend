import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateScheduleDto, UpdateScheduleDto } from '../dto';
import { ScheduleService } from '../services';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a new schedule' })
  @ApiBody({ type: CreateScheduleDto })
  @ApiResponse({
    status: 201,
    description: 'The schedule has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.createSchedule(createScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schedules' })
  @ApiResponse({
    status: 200,
    description: 'Return all schedules',
  })
  async getSchedule() {
    return this.scheduleService.getFullSchedule();
  }

  @Get('current')
  @ApiOperation({ summary: 'Get the current active class' })
  @ApiResponse({
    status: 200,
    description:
      'Return the current active class or a message if none is active',
  })
  async getCurrentClass() {
    return this.scheduleService.getCurrentClass();
  }

  @Get('day/:day')
  @ApiOperation({ summary: 'Get schedules for a specific day' })
  @ApiParam({ name: 'day', description: 'Day of the week (lowercase)' })
  @ApiResponse({
    status: 200,
    description: 'Return schedules for the specified day',
  })
  async getDaySchedule(@Param('day') day: string) {
    return this.scheduleService.getScheduleByDay(day);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a schedule by ID' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @ApiResponse({
    status: 200,
    description: 'Return a specific schedule',
  })
  @ApiResponse({ status: 404, description: 'Schedule not found.' })
  async getScheduleById(@Param('id') id: string) {
    return this.scheduleService.getScheduleById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update a schedule' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @ApiBody({ type: UpdateScheduleDto })
  @ApiResponse({
    status: 200,
    description: 'The schedule has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Schedule not found.' })
  async updateSchedule(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.updateSchedule(id, updateScheduleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a schedule' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @ApiResponse({
    status: 200,
    description: 'The schedule has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Schedule not found.' })
  async deleteSchedule(@Param('id') id: string) {
    return this.scheduleService.deleteSchedule(id);
  }
}
