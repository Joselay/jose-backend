import { PrismaService } from '@common/services';
import { CreateTeacherDto, UpdateTeacherDto } from '@modules/teacher/dto';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TeacherRepositoryService {
  private readonly logger = new Logger(TeacherRepositoryService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.teacher.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.teacher.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return this.prisma.teacher.findUnique({
      where: { name },
    });
  }

  async create(data: CreateTeacherDto) {
    return this.prisma.teacher.create({
      data,
    });
  }

  async update(id: string, data: UpdateTeacherDto) {
    return this.prisma.teacher.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }

  async updateAvatar(id: string, avatar: string) {
    return this.prisma.teacher.update({
      where: { id },
      data: { avatar },
    });
  }
}
