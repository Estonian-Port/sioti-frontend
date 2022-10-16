import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encendidoApagado'
})
export class EncendidoApagadoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? "Encendido" : "Apagado";
  }

}
