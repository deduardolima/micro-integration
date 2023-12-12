import { Module } from '@nestjs/common';
import { NdsService } from './nds.service';
import { NdsController } from './nds.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [NdsController],
  providers: [NdsService],
})
export class NdsModule { }
