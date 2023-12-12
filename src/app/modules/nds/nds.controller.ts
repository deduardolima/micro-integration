import { Controller, Get, Req, HttpStatus, HttpException, Param } from '@nestjs/common';
import { Authenticator } from '../../core/services/authenticator';
import { CdcService } from '../../core/services/cdc.services';
import { NdsService } from './nds.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
@ApiTags('Número da Sorte')
@Controller('nds')
export class NdsController {
  constructor(
    private readonly ndsService: NdsService,
    private readonly cdcService: CdcService,
    private readonly authenticator: Authenticator
  ) { }

  @Get('cliente')
  @ApiBearerAuth()
  async getNDS(@Req() req: Request): Promise<any> {
    try {
      const token: string = req.headers.authorization;
      const uid = this.authenticator.getTokenData(token);
      const firstNineDigits = uid.slice(0, 9);
      const newToken = await this.cdcService.getTokenUID(firstNineDigits);
      const campaign = await this.ndsService.getNDSStrapi();
      if (typeof newToken === 'string' && newToken) {
        const ti = await this.ndsService.getNDS(newToken);
        return this.ndsService.combinedData(ti, campaign)
      };
    } catch (error) {
      throw new HttpException('Sem Acesso', HttpStatus.UNAUTHORIZED);
    };
  };
  @Get('cliente/:campaignId')
  @ApiBearerAuth()
  async getNDSByCampaign(@Req() req: Request, @Param('campaignId') id: string): Promise<any> {
    const token: string = req.headers.authorization;
    const uid = this.authenticator.getTokenData(token);
    const firstNineDigits = uid.slice(0, 9);
    const newToken = await this.cdcService.getTokenUID(firstNineDigits);
    const campaign = await this.ndsService.getNDSStrapi();
    if (typeof newToken === 'string' && newToken) {
      const ti = await this.ndsService.getNDS(newToken);
      return this.ndsService.combineDataByCampaignID(ti, campaign, id)
    };
  };

}
