import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTeacherDto {
  @ApiProperty({
    description: 'The name of the teacher',
    example: 'Heng Phillipe',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'URL or path to the teacher avatar image',
    example: 'https://example.com/avatars/teacher.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar?: string;
}
