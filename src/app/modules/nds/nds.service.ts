import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ConvertDate } from '../../core/services/convert.date.service';

interface NdsData {
  id: string;
  nome: string
  titulo: string;
  label: string;
  descricao: string;
  dataInicio: string | number;
  dataFim: string | number;
  beneficio: LuckNumber;
  dataSync: string;
};

interface ClubeData {
  campanhaId: string;
  titulo: string;
  inicioPublic: string;
  fimPublic: string;
  banner: object;
  regulamento: object;
  publishAt: string;
};

interface LuckNumber {
  data: string;
  numero: string[]
}

@Injectable()
export class NdsService {
  private readonly logger = new Logger(NdsService.name);
  constructor(
    private http: HttpService,
    private config: ConfigService,
    private convertDate: ConvertDate,
  ) { }

  async getNDS(token: string): Promise<NdsData[]> {
    const data = await this.getNDSCondor(token);
    if (data) {
      return data;
    }
    return [];
  };
  async getNDSCondor(token: string): Promise<NdsData[]> {
    try {
      const headers = this.createAuthHeaders(token);
      const response: any = await firstValueFrom(
        this.http.get<{ data: { data: { sorteio: NdsData[] } } }>(this.config.get('URL_NDS'), { headers })
      );
      return response.data.data.sorteio;

    } catch (error) {
      throw new HttpException(this.getErrorMessage(error), this.getErrorStatusCode(error));
    }
  };
  private createAuthHeaders(token: string): Record<string, string> {
    return { Authorization: `Bearer ${token}` };
  };
  private parseDataFromTi(items: any) {
    try {
      const data: any = [];
      items.forEach((item) => {
        data.push({
          id: String(item.idcampanha),
          nome: item.nome,
          titulo: item.titulo,
          label: item.label,
          descricao: item.descricao,
          dataInicio: this.convertDate.dateToTimestamp(item.datainiciocampanha),
          dataFim: this.convertDate.dateToTimestamp(item.dataterminocampanha),
          beneficio: item.beneficio === undefined ? 0 : item.beneficio,
          dataSync: item.datahorasincronizacao
        })
      });
      return data;

    } catch (error) {
      console.log(error)
    }
  };
  private async fetchData(url: string): Promise<any> {
    const config = { headers: { 'Content-Type': 'application/json' } };
    return firstValueFrom(this.http.get(url, config));
  };
  async getNDSStrapi() {
    try {
      const response = await this.fetchData(this.config.get('URL_CLUBE'));
      return this.parseNDSStrapi(response.data.data);
    } catch (error) {
      if (error.response) {
        throw new HttpException(this.getErrorMessage(error), this.getErrorStatusCode(error));
      } else {
        throw error;
      }
    }
  };
  private parseNDSStrapi(data: any): ClubeData[] {
    const results = []
    data.forEach((el: any) => {
      results.push(this.parseCampaignData(el));
    });
    return results;
  };
  private parseCampaignData(result: any): ClubeData {
    return {
      campanhaId: result.attributes.numeroCampanha,
      titulo: result.attributes.Titulo,
      inicioPublic: result.attributes.Start,
      fimPublic: result.attributes.End,
      banner: {
        name: result.attributes.Banner.data.attributes.name,
        url: result.attributes.Banner.data.attributes.url,
        formats: result.attributes.Banner.data.attributes.formats,
        hash: result.attributes.Banner.data.attributes.formats.hash,
        mime: result.attributes.Banner.data.attributes.formats.mime,
        size: result.attributes.Banner.data.attributes.formats.size,
      },
      regulamento: {
        name: result.attributes.Regulamento.data.attributes.name,
        hash: result.attributes.Regulamento.data.attributes.hash,
        ext: result.attributes.Regulamento.data.attributes.ext,
        mime: result.attributes.Regulamento.data.attributes.mime,
        size: result.attributes.Regulamento.data.attributes.size,
        url: result.attributes.Regulamento.data.attributes.url
      },
      publishAt: result.attributes.publishedAt
    };
  };
  combinedData(sorteios: NdsData[], campaigns: any[]) {
    try {
      const mergedPayload: any[] = [];
      const items: any = this.parseDataFromTi(sorteios);
      const today = this.convertDate.currentDate();
      const fill: any = items.filter((row: any) => row.dataFim > today)
      for (const item of fill) {
        const matchingCampaign: any = campaigns.find(campaign => campaign.campanhaId === item.id);
        if (matchingCampaign) {
          const combinedItem = this.parseMergeCampaign(item, matchingCampaign);
          mergedPayload.push(combinedItem);
        }
      }
      return mergedPayload

    } catch (error) {
      throw new HttpException(this.getErrorMessage(error), this.getErrorStatusCode(error));
    }
  };

  private parseMergeCampaign(item: any, matchingCampaign: any): Object {
    return {
      id: item.id,
      nome: item.nome,
      descricao: item.descricao,
      dataInicio: this.convertDate.toDate(item.dataInicio),
      dataFim: this.convertDate.toDate(item.dataFim),
      luckNumber: item.beneficio,
      dataSync: item.dataSync,
      ...matchingCampaign,
    };
  };
  private getErrorMessage(error: any): string {
    return error.response?.statusText ?? 'Unknown Error';
  };
  private getErrorStatusCode(error: any): number {
    return error.response?.status ? Number(error.response.status) : 500;
  };
  combineDataByCampaignID(sorteios: NdsData[], campaigns: any[], campaignId: string) {
    try {
      const mergedPayload: any[] = [];
      const items: any = this.parseDataFromTi(sorteios);
      const today = this.convertDate.currentDate();
      const fill: any = items.filter((row: any) => row.dataFim > today)
      for (const item of fill) {
        const matchingCampaign: any = campaigns.find(campaign => campaign.campanhaId === item.id);
        if (matchingCampaign) {
          const combinedItem = this.parseMergeCampaign(item, matchingCampaign);
          mergedPayload.push(combinedItem);
        }
      }
      const findCampaign: any = mergedPayload.find(campaign => campaign.id === campaignId);
      if (!findCampaign) {
        throw new HttpException("Campanha não existe", HttpStatus.NOT_FOUND);
      }
      return findCampaign

    } catch (error) {
      throw new HttpException(this.getErrorMessage(error), this.getErrorStatusCode(error));
    }
  };
}
