import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mcu } from 'src/app/model/mcu/mcu';
import { McuService } from 'src/app/services/mcu/mcu.service';

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
  
  constructor(public mcuService: McuService, public router: Router) { }

  verHorarios(mcu: Mcu) {
    this.router.navigate(['/onOff', mcu.id])
  }

  async ngOnInit(): Promise<void> {
     try {
        this.mcus = await this.mcuService.getAllMcus()
      } catch (error) {
        mostrarError(this, error)
      }
  }

}
