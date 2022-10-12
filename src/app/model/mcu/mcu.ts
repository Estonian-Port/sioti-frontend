export type McuJSON = {
  id?: number,
  nombre: string
}


export class Mcu {
    
    constructor(public id: number, public nombre: string) {}

    static fromJson(mcuJSON: McuJSON): Mcu {
        return Object.assign(new Mcu(mcuJSON.id!, mcuJSON.nombre), Mcu)
    }
}
