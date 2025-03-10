import { Guitar } from "../classes/guitar";
import { InstrumentFactory } from "../classes/instrument_factory";
import { Piano } from "../classes/piano";
import { Violin } from "../classes/violin";


describe('InstrumentFactory', () => {
    it('should create a Guitar', () => {
        const guitar = InstrumentFactory.getInstrument('Guitar', 'Fender', 24, 6);
        expect(guitar).toBeInstanceOf(Guitar);
        expect(guitar.name).toBe('Fender');
    });

    it('should create a Piano', () => {
        const piano = InstrumentFactory.getInstrument('Piano', 'Yamaha', 88, true);
        expect(piano).toBeInstanceOf(Piano);
        expect(piano.name).toBe('Yamaha');
    });

    it('should create a Violin', () => {
        const violin = InstrumentFactory.getInstrument('Violin', 'Stradivarius', 4, 3);
        expect(violin).toBeInstanceOf(Violin);
        expect(violin.name).toBe('Stradivarius');
    });

    it('should throw an error for an invalid instrument type', () => {
        expect(() => {
            InstrumentFactory.getInstrument('Drums', 'Yamaha', 20, true);
        }).toThrowError('Неправильний тип інструменту');
    });
});
