import { wrap } from '@helpers/index';

describe('wrap', () => {
    it('should wrap values', () => {
        expect(wrap([1])).toStrictEqual([1]);
        expect(wrap(1)).toStrictEqual([1]);
    });

    it('should wrap falsy values', () => {
        [0, '', false, null].forEach(value => {
            expect(wrap(value)).toStrictEqual([value]);
        });
    });

    it('should not return empty array on undefined', () => {
        expect(wrap()).toStrictEqual([]);
        expect(wrap(undefined)).toStrictEqual([]);
    });
});
