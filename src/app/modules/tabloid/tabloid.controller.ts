import { Controller, Get, Param, Delete } from '@nestjs/common';
import { TabloidService } from './tabloid.service';


@Controller('tabloid')
export class TabloidController {
  constructor(private readonly tabloidService: TabloidService) { }



  @Get('all')
  async findAll() {
    return await this.tabloidService.getAllTabloids();
  };

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tabloidService.getTabloidByID(id)
  };

  @Get('region:region')
  async findOneByRegion(@Param('region') region: string) {
    return await this.tabloidService.getTabloidByRegion(region)
  };

}
