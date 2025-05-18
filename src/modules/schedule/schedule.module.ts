import { PrismaService } from '@common/services';
import { ScheduleController } from '@modules/schedule/controllers';
import { ScheduleService } from '@modules/schedule/services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
