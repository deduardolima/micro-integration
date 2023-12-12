import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';


@Injectable()
export class TabloidService {
  constructor(
    private readonly http: HttpService,
  ) { }

  async getAllTabloids() {
    try {
      const response = await firstValueFrom(this.http.get(`http://localhost:3000/tabloid/all`)
        .pipe(map(res => res)));
      console.log(response)
      return response;


    } catch (error) {
      console.log('Error:', error);

    }

  };
  async getTabloidByID(id: string) {
    try {
      const response = await firstValueFrom(this.http.get(`http://localhost:3000/tabloid/${id}`)
        .pipe(map(res => res.data)));
      console.log(response)
      return response;
    } catch (error) {
      console.log('Error:', error);

    }
  }
  async getTabloidByRegion(region: string) {
    try {
      const response = await firstValueFrom(this.http.get(`http://localhost:3000/tabloid/region/${region}`)
        .pipe(map(res => res.data)));
      console.log(response)
      return response;
    } catch (error) {
      console.log('Error:', error);

    }
  }
}
