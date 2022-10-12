import { Mcu } from "../mcu/mcu"

export type OnOffJSON = {
  id?: number,
  action: boolean,
  localDateTime: Date,
  mcu: Mcu
}

export class OnOff {

    constructor(public id: number, public action: boolean, public localDateTime: Date, public mcu: Mcu) {}

    static fromJson(onOffJSON: OnOffJSON): OnOff {
        return Object.assign(new OnOff(onOffJSON.id!, onOffJSON.action, onOffJSON.localDateTime, onOffJSON.mcu), OnOff)
    }
}
