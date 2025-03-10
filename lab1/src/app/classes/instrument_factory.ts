import { Guitar } from "./guitar";
import { Piano } from "./piano";
import { Violin } from "./violin";


export type InstrumentName = 'Guitar' | 'Piano' | 'Violin';
export type InstrumentNameMap = {
    [key: string]: InstrumentName;
}

export type InstrumentsNameMap = {
    Guitar: "Гітара";
    Piano: "Фортепіано";
    Violin: "Скрипка";
}

export class InstrumentFactory {
    public static getInstrument(type: string, name: string, noteRange: number, optional: number | boolean) {
        if (type === 'Guitar') {
            return new Guitar(name, type, noteRange, optional as number);
        } else if (type === 'Piano') {    
            return new Piano(name, type, noteRange, optional as boolean);
        } else if (type === 'Violin') {
            return new Violin(name, type, noteRange, optional as number);
        } else {
            throw new Error('Неправильний тип інструменту');
        }
    }
}
