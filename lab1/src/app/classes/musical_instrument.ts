export abstract class MusicalInstrument {
    constructor(
        public name: string,
        public type: string,
        public noteRange: number
    ) {}

    playSound(): String {
        return `${this.name} видає звук.`;
    }

    displayInfo(): String {
        return `Назва: ${this.name}, Тип: ${this.type}, Діапазон нот: ${this.noteRange}`;
    }
}