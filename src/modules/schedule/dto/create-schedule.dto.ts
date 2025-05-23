import { TIME_FORMAT_REGEX } from '@common/types';
import {
  Day,
  getAvailableEndTimes,
  getAvailableStartTimes,
} from '@modules/schedule/constants';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

export class IsValidStartTime {
  validate(value: string) {
    const validStartTimes = getAvailableStartTimes();
    return validStartTimes.includes(value);
  }

  defaultMessage() {
    const validTimes = getAvailableStartTimes().join(', ');
    return `Start time must be one of the following: ${validTimes}`;
  }
}

export class IsValidEndTime {
  validate(value: string) {
    const validEndTimes = getAvailableEndTimes();
    return validEndTimes.includes(value);
  }

  defaultMessage() {
    const validTimes = getAvailableEndTimes().join(', ');
    return `End time must be one of the following: ${validTimes}`;
  }
}

export class CreateScheduleDto {
  @ApiProperty({
    description: 'The name of the teacher',
    example: 'Heng Phillipe',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  teacherName: string;

  @ApiProperty({
    description: 'The classroom identifier',
    example: '3A',
  })
  @IsNotEmpty()
  @IsString()
  room: string;

  @ApiProperty({
    description: 'The start time in 24-hour format (H:MM)',
    example: '5:45',
    enum: getAvailableStartTimes(),
  })
  @IsNotEmpty()
  @IsString()
  @Matches(TIME_FORMAT_REGEX, {
    message: 'Start time must be in the format H:MM or HH:MM (24-hour format)',
  })
  @Validate(IsValidStartTime)
  startTime: string;

  @ApiProperty({
    description: 'The end time in 24-hour format (H:MM)',
    example: '6:45',
    enum: getAvailableEndTimes(),
  })
  @IsNotEmpty()
  @IsString()
  @Matches(TIME_FORMAT_REGEX, {
    message: 'End time must be in the format H:MM or HH:MM (24-hour format)',
  })
  @Validate(IsValidEndTime)
  endTime: string;

  @ApiProperty({
    description: 'The day of the week (lowercase)',
    example: 'monday',
    enum: Day,
  })
  @IsNotEmpty()
  @IsEnum(Day)
  day: Day;

  @ApiProperty({
    description: 'The subject name',
    example: 'Mathematics',
  })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({
    description: 'The semester number or name',
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  semester?: string;

  @ApiProperty({
    description: 'The academic year',
    example: '2025',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  year?: string;
}
