import { Guitar } from "../classes/guitar";


describe('Guitar', () => {
    let guitar: Guitar;

    beforeEach(() => {
        guitar = new Guitar('Fender', 'Guitar', 24, 6);
    });

    it('should be an instance of Guitar', () => {
        expect(guitar).toBeInstanceOf(Guitar);
    });

    it('should have correct properties', () => {
        expect(guitar.name).toBe('Fender');
        expect(guitar.type).toBe('Guitar');
        expect(guitar.noteRange).toBe(24);
        expect(guitar.numberOfStrings).toBe(6);
    });

    it('should return correct tune message', () => {
        const result = guitar.tune();
        expect(result).toBe('Fender налаштовано.');
    });
});
