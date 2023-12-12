import { TransationsController } from './transations.controller';
import { TransationsService } from './transations.service';
import { HttpModule } from "@nestjs/axios";
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [TransationsController],
  providers: [TransationsService],
})
export class TransationsModule { }
