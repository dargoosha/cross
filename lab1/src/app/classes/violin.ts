import { MusicalInstrument } from "./musical_instrument";

export class Violin extends MusicalInstrument {
    constructor(
        name: string,
        type: string,
        noteRange: number,
        public size: number
    ) {
        super(name, type, noteRange);
    }
    tune(): String {
        return `${this.name} видає звук.`;
    }
}