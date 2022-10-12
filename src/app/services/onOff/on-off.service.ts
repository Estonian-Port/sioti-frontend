import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Mcu } from 'src/app/model/mcu/mcu';
import { OnOff, OnOffJSON } from 'src/app/model/onOff/on-off';
import { REST_SERVER_URL } from '../configuration/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class OnOffService {
  
  constructor(private httpClient: HttpClient) { }

    async getAllOnOffByMcu(mcu: Mcu) {
      const onOffs$ = this.httpClient.get<OnOffJSON[]>(REST_SERVER_URL + '/getAllOnOffByMcu/' + mcu.id)
      const onOffs = await lastValueFrom(onOffs$)
      return onOffs.map((onoffJSON) => OnOff.fromJson(onoffJSON))
  }
}
