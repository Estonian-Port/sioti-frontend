import { Injectable } from '@angular/core';
import { Mcu, McuJSON } from 'src/app/model/mcu/mcu';
import { HttpClient } from '@angular/common/http';
import { REST_SERVER_URL } from '../configuration/configuration.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class McuService {

  constructor(private httpClient: HttpClient) { }
  
    async getAllMcus() {
      const mcus$ = this.httpClient.get<McuJSON[]>(REST_SERVER_URL + '/getAllMcu')
      const mcus = await lastValueFrom(mcus$)
      return mcus.map((mcuJSON) => Mcu.fromJson(mcuJSON))
  }
}
