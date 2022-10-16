import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Mcu } from 'src/app/model/mcu/mcu';
import { OnOff, OnOffJSON } from 'src/app/model/onOff/on-off';
import { REST_MCU_URL, REST_SERVER_URL } from '../configuration/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class OnOffService {
  
  async saveOnOff(estado: boolean, mcu: Mcu) : Promise<OnOffJSON>{
    const onOff = new OnOff(0, estado, new Date(), mcu)
    const mcuOnOff$ = this.httpClient.post<OnOffJSON>(REST_SERVER_URL+ '/saveOnOff', onOff)
    return await lastValueFrom(mcuOnOff$)
  }
  
  async setOnOff(estado: boolean, mcu: Mcu) : Promise<boolean>{
    const state$ = this.httpClient.get<boolean>(REST_MCU_URL+ '/onOff?estado=' + Number(estado) + '&relay=' + mcu.id )
    return await lastValueFrom(state$)
  }
  
  constructor(private httpClient: HttpClient) { }

  async getAllOnOffByMcu(mcu: Mcu) {
    const onOffs$ = this.httpClient.get<OnOffJSON[]>(REST_SERVER_URL + '/getAllOnOffByMcu/' + mcu.id)
    const onOffs = await lastValueFrom(onOffs$)
    return onOffs.map((onoffJSON) => OnOff.fromJson(onoffJSON))
  }

}
