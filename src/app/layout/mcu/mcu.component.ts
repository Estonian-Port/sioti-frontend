import { Time } from '@angular/common';
import { Serializer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, timer } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { Mcu } from 'src/app/model/mcu/mcu';
import { McuService } from 'src/app/services/mcu/mcu.service';
import { OnOffService } from 'src/app/services/onOff/on-off.service';

export function mostrarError(component: any, error: any): void {
  const errorMessage = (error.status === 0) ? 'No hay conexión con el backend, revise si el servidor remoto está levantado.' : error.error ? error.error.message : error.message
  component.errors.push(errorMessage)
}

@Component({
  selector: 'app-mcu',
  templateUrl: './mcu.component.html',
  styleUrls: ['./mcu.component.css']
})
export class McuComponent implements OnInit {

  mcus: Array<Mcu> = []
  errors = []
  red = 'red'
  green = 'green'
  
  constructor(public mcuService: McuService, public onOffService: OnOffService, public router: Router) {
    
     interval(1000).subscribe(async x => {
        this.mcus.forEach(async (mcu: Mcu) => {
         if(mcu.estado){
           mcu.tiempo.setSeconds(mcu.tiempo.getSeconds() + 1)
         }
       });
     });
   }

  async ngOnInit(): Promise<void> {
     try {
        this.mcus = await this.mcuService.getAllMcus()

        this.mcus.forEach(async (mcu: Mcu) => {
          mcu.estado = await this.mcuService.getEstado(mcu);
          mcu.tiempo = new Date(0,0,0,0,0,0);
          mcu.tiempo.setSeconds(await this.mcuService.getTiempoEncendido(mcu));
        });

      } catch (error) {
        mostrarError(this, error)
      }
  }

  verHorarios(mcu: Mcu) {
    this.router.navigate(['/onOff', mcu.id])
  }

  async setOnOff(estado : boolean, mcu: Mcu) {
    await this.onOffService.setOnOff(estado, mcu);
    await this.onOffService.saveOnOff(estado, mcu);
    mcu.estado = await this.mcuService.getEstado(mcu)
    if(!mcu.estado){
      mcu.tiempo = new Date(0,0,0,0,0,0);
    }
  }
}
