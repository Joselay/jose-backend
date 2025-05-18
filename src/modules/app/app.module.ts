import { AppController } from '@modules/app/app.controller';
import { AppService } from '@modules/app/app.service';
import { ScheduleModule } from '@modules/schedule';
import { TeacherModule } from '@modules/teacher';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule,
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
