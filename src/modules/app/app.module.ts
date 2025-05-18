import { AppController } from '@modules/app/app.controller';
import { AppService } from '@modules/app/app.service';
import { ScheduleModule } from '@modules/schedule';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
