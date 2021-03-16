import { getPrecision } from '@helpers/index';

describe('helpers', () => {
    describe('getPrecision', () => {
        it('should return the number of fraction digits in floats', () => {
            expect(getPrecision(1.23)).toBe(2);
            // @ts-expect-error
            expect(getPrecision('1.2')).toBe(1);
            // @ts-expect-error
            expect(getPrecision('.2')).toBe(1);
        });

        it('should return zero for integers', () => {
            expect(getPrecision(1)).toBe(0);
        });

        it('should throw an error on invalid arguments', () => {
            // @ts-expect-error
            expect(() => getPrecision('1.2.3')).toThrow(new Error('Expected a number, got: 1.2.3'));
        });
    });
});
