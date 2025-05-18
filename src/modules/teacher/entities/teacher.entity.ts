import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class Teacher {
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
  name: string;

  @ApiProperty({
    description: 'URL or path to the teacher avatar image',
    example: 'https://example.com/avatars/teacher.jpg',
    required: false,
  })
  @Expose()
  @IsString()
  @IsOptional()
  avatar?: string;

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

  static fromPrisma(prismaData: any): Teacher {
    const teacher = new Teacher();
    Object.assign(teacher, prismaData);
    return teacher;
  }

  static fromPrismaArray(prismaData: any[]): Teacher[] {
    return prismaData.map((data) => Teacher.fromPrisma(data));
  }

  getAvatarUrl(): string {
    if (this.avatar) {
      return this.avatar;
    }

    const initials = this.name
      .split(' ')
      .map((name) => name.charAt(0))
      .join('')
      .toUpperCase();

    return `https://ui-avatars.com/api/?name=${initials}&background=random&size=256`;
  }
}
