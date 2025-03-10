import { Violin } from "../classes/violin";


describe('Violin', () => {
    let violin: Violin;

    beforeEach(() => {
        violin = new Violin('Stradivarius', 'Violin', 4, 3);
    });

    it('should be an instance of Violin', () => {
        expect(violin).toBeInstanceOf(Violin);
    });

    it('should have correct properties', () => {
        expect(violin.name).toBe('Stradivarius');
        expect(violin.type).toBe('Violin');
        expect(violin.noteRange).toBe(4);
        expect(violin.size).toBe(3);
    });

    it('should return correct tune message', () => {
        const result = violin.tune();
        expect(result).toBe('Stradivarius видає звук.');
    });
});
