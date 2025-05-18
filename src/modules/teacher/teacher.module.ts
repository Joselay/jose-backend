import { PrismaService, UploadService } from '@common/services';
import { TeacherController } from '@modules/teacher/controllers';
import {
  TeacherRepositoryService,
  TeacherService,
} from '@modules/teacher/services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TeacherController],
  providers: [
    TeacherService,
    TeacherRepositoryService,
    PrismaService,
    UploadService,
  ],
  exports: [TeacherService],
})
export class TeacherModule {}
