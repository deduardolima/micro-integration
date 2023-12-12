import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import * as https from 'https'
const httpAgent = new https.Agent({ rejectUnauthorized: false })

@Injectable()
export class TransationsService {
  constructor(
    private readonly http: HttpService,
  ) { }

  async getHistoric(token: any) {
    try {
      const config = {
        method: 'GET',
        httpAgent,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await firstValueFrom(this.http.get(`${process.env.URL_TRANSATIONS}/compras/historico`, config)
        .pipe(map(res => res.data)));

      return response;

    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response.statusText, Number(error.response.status));
      } else {
        throw error;
      }
    }
  };
  async getBalance(token: any) {
    try {
      const config = {
        method: 'GET',
        httpAgent,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await firstValueFrom(this.http.get(`${process.env.URL_TRANSATIONS}/saldo`, config)
        .pipe(map(res => res.data)));

      return response;

    } catch (error) {
      if (error.response) {
        console.log(error.response)
        throw new HttpException(error.response.statusText, Number(error.response.status));
      } else {
        throw error;
      }
    };
  };
  async getExtract(token: any, dataInicio: string, dataFim: string) {
    try {
      const config = {
        method: 'GET',
        httpAgent,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const response = await firstValueFrom(this.http.get(`${process.env.URL_TRANSATIONS}/extrato?dataInicio=${dataInicio}&dataFim=${dataFim}`, config)
        .pipe(map(res => res.data)));

      return response;

    } catch (error) {
      if (error.response) {
        console.log(error.response)
        throw new HttpException(error.response.statusText, Number(error.response.status));
      } else {
        throw error;
      }
    };
  };

}
