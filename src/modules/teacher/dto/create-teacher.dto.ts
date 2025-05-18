import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    description: 'The name of the teacher',
    example: 'Heng Phillipe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'URL or path to the teacher avatar image',
    example: 'https://example.com/avatars/teacher.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar?: string;
}
