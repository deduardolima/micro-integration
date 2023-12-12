import { Module } from '@nestjs/common';
import { NdsModule } from './nds/nds.module';
import { TransationsModule } from './transations/transations.module';
import { TabloidModule } from './tabloid/tabloid.module';


@Module({
  imports: [
    NdsModule,
    TransationsModule,
    TabloidModule,
  ]
})
export class ModulesModule { }
