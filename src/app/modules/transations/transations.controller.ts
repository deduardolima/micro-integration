import { Authenticator } from '../../core/services/authenticator';
import { CdcService } from '../../core/services/cdc.services';
import { Controller, Get, HttpException, HttpStatus, Param, Req } from '@nestjs/common';
import { TransationsService } from './transations.service';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('transations')
export class TransationsController {
  constructor(
    private readonly transationsService: TransationsService,
    private readonly cdcService: CdcService,
    private readonly authenticator: Authenticator
  ) { }

  @Get('historic')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token de autenticação',
    example: '{token}'
  })
  async getHistoric(@Req() req: Request) {
    try {
      const token = req.headers.authorization;
      const uid = this.authenticator.getTokenData(token);
      const firstNineDigits = uid.slice(0, 9);
      const newToken = await this.cdcService.getTokenUID(firstNineDigits);
      if (typeof newToken === 'string' && newToken) {
        return await this.transationsService.getHistoric(newToken);
      };

    } catch (error) {
      throw new HttpException('Sem Acesso', HttpStatus.UNAUTHORIZED);
    }
  };
  @Get('token/:uid')
  async getToken(@Param('uid') uid: string) {
    return await this.cdcService.getTokenUID(uid)
  }

  @Get('balance')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token de autenticação',
    example: '{token}'
  })
  async getBalance(@Req() req: Request) {
    try {
      const token = req.headers.authorization;
      const uid = this.authenticator.getTokenData(token);
      const firstNineDigits = uid.slice(0, 9);
      const newToken = await this.cdcService.getTokenUID(firstNineDigits);
      if (typeof newToken === 'string' && newToken) {
        return await this.transationsService.getBalance(newToken);

      };
    } catch (error) {
      throw new HttpException('Sem Acesso', HttpStatus.UNAUTHORIZED);
    }
  }
  @Get('extract/:dataInicio/:dataFim')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token de autenticação',
    example: '{token}'
  })
  async getExtract(@Req() req: Request, @Param('dataInicio') dataInicio: string, @Param('dataFim') dataFim: string) {
    try {
      const token = req.headers.authorization;
      const uid = this.authenticator.getTokenData(token);
      const firstNineDigits = uid.slice(0, 9);
      const newToken = await this.cdcService.getTokenUID(firstNineDigits);
      if (typeof newToken === 'string' && newToken) {
        return await this.transationsService.getExtract(newToken, dataInicio, dataFim);

      };
    } catch (error) {
      throw new HttpException('Sem Acesso', HttpStatus.UNAUTHORIZED);
    };
  }
}
