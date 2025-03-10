import { MusicalInstrument } from "./musical_instrument";

export class Guitar extends MusicalInstrument {
    constructor(
        name: string,
        type: string,
        noteRange: number,
        public numberOfStrings: number
    ) {
        super(name, type, noteRange);
    }

    tune(): String {
        return `${this.name} налаштовано.`;
    }
}