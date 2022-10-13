import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mcu } from 'src/app/model/mcu/mcu';
import { OnOff } from 'src/app/model/onOff/on-off';
import { McuService } from 'src/app/services/mcu/mcu.service';
import { OnOffService } from 'src/app/services/onOff/on-off.service';

export function mostrarError(component: any, error: any): void {
  const errorMessage = (error.status === 0) ? 'No hay conexión con el backend, revise si el servidor remoto está levantado.' : error.error ? error.error.message : error.message
  component.errors.push(errorMessage)
}

@Component({
  selector: 'app-on-off',
  templateUrl: './on-off.component.html',
  styleUrls: ['./on-off.component.css']
})
export class OnOffComponent implements OnInit {

  onOffs: Array<OnOff> = []
  errors = []
  mcu: Mcu = new Mcu(0, "")

  constructor(public onOffService: OnOffService, public mcuService: McuService, private router: Router, private route: ActivatedRoute) { }
 

  async ngOnInit(): Promise<void> {
     try {
        await this.initialize()
        this.onOffs = await this.onOffService.getAllOnOffByMcu(this.mcu)
      } catch (error) {
        mostrarError(this, error)
      }
  }

  async initialize() {
      const idMcu = this.route.snapshot.params['id']
      this.mcu = await this.mcuService.getMcuById(idMcu)
  }

}
