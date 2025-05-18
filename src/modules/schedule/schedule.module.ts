import { PrismaService } from '@common/services';
import { ScheduleController } from '@modules/schedule/controllers';
import {
  ScheduleMapperService,
  ScheduleRepositoryService,
  ScheduleService,
} from '@modules/schedule/services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    ScheduleMapperService,
    ScheduleRepositoryService,
    PrismaService,
  ],
  exports: [ScheduleService],
})
export class ScheduleModule {}
