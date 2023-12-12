import { Module } from '@nestjs/common';
import { TabloidService } from './tabloid.service';
import { TabloidController } from './tabloid.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TabloidController],
  providers: [TabloidService],
})
export class TabloidModule { }
