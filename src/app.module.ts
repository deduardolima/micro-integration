import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './app/core/core.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { ModulesModule } from './app/modules/modules.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    ModulesModule,
    CoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
