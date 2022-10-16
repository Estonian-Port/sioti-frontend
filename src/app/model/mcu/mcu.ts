export type McuJSON = {
  id?: number,
  nombre: string,
  estado: boolean
}

export class Mcu {
    
    constructor(public id: number, public nombre: string, public estado: boolean) {}

    static fromJson(mcuJSON: McuJSON): Mcu {
        return Object.assign(new Mcu(mcuJSON.id!, mcuJSON.nombre, mcuJSON.estado), Mcu)
    }
}
