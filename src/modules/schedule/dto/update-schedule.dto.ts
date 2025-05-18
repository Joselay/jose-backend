import { CreateScheduleDto } from '@modules/schedule/dto/create-schedule.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}
