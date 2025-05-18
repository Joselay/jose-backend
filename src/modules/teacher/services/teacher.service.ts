import { CreateTeacherDto, UpdateTeacherDto } from '@modules/teacher/dto';
import { Teacher } from '@modules/teacher/entities';
import { TeacherRepositoryService } from '@modules/teacher/services/teacher-repository.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class TeacherService {
  private readonly logger = new Logger(TeacherService.name);

  constructor(private readonly teacherRepository: TeacherRepositoryService) {}

  async getAllTeachers() {
    this.logger.log('Getting all teachers');
    const teachers = await this.teacherRepository.findAll();
    return Teacher.fromPrismaArray(teachers);
  }

  async getTeacherById(id: string) {
    this.logger.log(`Getting teacher with ID: ${id}`);
    const teacher = await this.teacherRepository.findById(id);

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return Teacher.fromPrisma(teacher);
  }

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    this.logger.log(`Creating teacher: ${createTeacherDto.name}`);
    const teacher = await this.teacherRepository.create(createTeacherDto);
    return Teacher.fromPrisma(teacher);
  }

  async updateTeacher(id: string, updateTeacherDto: UpdateTeacherDto) {
    this.logger.log(`Updating teacher with ID: ${id}`);

    const existingTeacher = await this.teacherRepository.findById(id);
    if (!existingTeacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    const teacher = await this.teacherRepository.update(id, updateTeacherDto);
    return Teacher.fromPrisma(teacher);
  }

  async deleteTeacher(id: string) {
    this.logger.log(`Deleting teacher with ID: ${id}`);

    const existingTeacher = await this.teacherRepository.findById(id);
    if (!existingTeacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    const teacher = await this.teacherRepository.delete(id);
    return Teacher.fromPrisma(teacher);
  }

  async updateTeacherAvatar(id: string, avatar: string) {
    this.logger.log(`Updating avatar for teacher with ID: ${id}`);

    const existingTeacher = await this.teacherRepository.findById(id);
    if (!existingTeacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    const teacher = await this.teacherRepository.updateAvatar(id, avatar);
    return Teacher.fromPrisma(teacher);
  }
}
