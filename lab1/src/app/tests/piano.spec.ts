import { Piano } from "../classes/piano";


describe('Piano', () => {
    let piano: Piano;

    beforeEach(() => {
        piano = new Piano('Yamaha', 'Piano', 88, true);
    });

    it('should be an instance of Piano', () => {
        expect(piano).toBeInstanceOf(Piano);
    });

    it('should have correct properties', () => {
        expect(piano.name).toBe('Yamaha');
        expect(piano.type).toBe('Piano');
        expect(piano.noteRange).toBe(88);
        expect(piano.isGrand).toBeTrue();
    });
});
