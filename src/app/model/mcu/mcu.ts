export type McuJSON = {
  id?: number,
  nombre: string,
  estado: boolean,
  tiempo : Date
}

export class Mcu {
    
    constructor(public id: number, public nombre: string, public estado: boolean, public tiempo : Date) {}

    static fromJson(mcuJSON: McuJSON): Mcu {
        return Object.assign(new Mcu(mcuJSON.id!, mcuJSON.nombre, mcuJSON.estado, mcuJSON.tiempo), Mcu)
    }
}
