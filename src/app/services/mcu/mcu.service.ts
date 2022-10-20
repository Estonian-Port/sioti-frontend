import { Injectable } from '@angular/core';
import { Mcu, McuJSON } from 'src/app/model/mcu/mcu';
import { HttpClient } from '@angular/common/http';
import { REST_MCU_URL, REST_SERVER_URL } from '../configuration/configuration.service';
import { lastValueFrom } from 'rxjs';
import { formatDate, Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class McuService {

  async getTiempoEncendido(mcu: Mcu) {
    const tiempoEncendido$ = this.httpClient.get<Date>(REST_SERVER_URL + '/getTiempoEncendido/' + mcu.id)
    const tiempoEncendido = await lastValueFrom(tiempoEncendido$)
    return tiempoEncendido
  }
  
  async getEstado(mcu: Mcu): Promise<boolean> {
    const state$ = this.httpClient.get<boolean>(REST_MCU_URL + '/getState?relay=' + mcu.id)
    return await lastValueFrom(state$)
  }

  constructor(private httpClient: HttpClient) { }
  
  async getAllMcus() {
    const mcus$ = this.httpClient.get<McuJSON[]>(REST_SERVER_URL + '/getAllMcu')
    const mcus = await lastValueFrom(mcus$)
    return mcus.map((mcuJSON) => Mcu.fromJson(mcuJSON))
  }

  async getMcuById(idMcu: number) {
    const mcu$ = this.httpClient.get<McuJSON>(REST_SERVER_URL + '/findMcu/' + idMcu)
    const mcuJson = await lastValueFrom(mcu$)
    const currentDate = new Date();
    
    return mcuJson ? Mcu.fromJson(mcuJson) : new Mcu(1, "test", false, currentDate)
  }

}
