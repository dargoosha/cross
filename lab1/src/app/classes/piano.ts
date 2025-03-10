import { MusicalInstrument } from "./musical_instrument";

export class Piano extends MusicalInstrument {
    constructor(
        name: string,
        type: string,
        noteRange: number,
        public isGrand: boolean
    ) {
        super(name, type, noteRange);
    }
}