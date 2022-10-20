import { Time } from '@angular/common';
import { Serializer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, timer } from 'rxjs';
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
  counter = new Date(0,0,0,0,0,0);

  
  constructor(public mcuService: McuService, public onOffService: OnOffService, public router: Router) {
    interval(10000).subscribe(async x => {
      this.mcus.forEach(async (mcu: Mcu) => {
        mcu.tiempo = await this.mcuService.getTiempoEncendido(mcu);
      });
    });
    
    interval(1000).subscribe(async x => {
      this.counter = new Date(0,0,0,0,0,0);
      this.counter.setSeconds(x)
    });

   }  

  verHorarios(mcu: Mcu) {
    this.router.navigate(['/onOff', mcu.id])
  }

  async setOnOff(estado : boolean, mcu: Mcu) {
    await this.onOffService.setOnOff(estado, mcu);
    await this.onOffService.saveOnOff(estado, mcu);
    mcu.estado = await this.mcuService.getEstado(mcu)
  }

  async ngOnInit(): Promise<void> {
     try {
        this.mcus = await this.mcuService.getAllMcus()

        this.mcus.forEach(async (mcu: Mcu) => {
          mcu.estado = await this.mcuService.getEstado(mcu);
          mcu.tiempo = await this.mcuService.getTiempoEncendido(mcu);
        });

      } catch (error) {
        mostrarError(this, error)
      }
  }

}
