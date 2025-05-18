import { Module } from '@nestjs/common';
import { PrismaService } from '../../common';
import { ScheduleController } from './controllers';
import { ScheduleService } from './services';

@Module({
  imports: [],
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
