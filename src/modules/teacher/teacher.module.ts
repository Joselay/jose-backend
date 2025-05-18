import { PrismaService } from '@common/services';
import { TeacherController } from '@modules/teacher/controllers';
import {
  TeacherRepositoryService,
  TeacherService,
} from '@modules/teacher/services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherRepositoryService, PrismaService],
  exports: [TeacherService],
})
export class TeacherModule {}
