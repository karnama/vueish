import { wrap } from 'helpers/index';

describe('wrap()', () => {
    it('should wrap a value in an array if it isn\'t already an array', () => {
        expect(wrap([1, 2])).toStrictEqual([1, 2]);
        expect(wrap(1)).toStrictEqual([1]);
        expect(wrap([])).toStrictEqual([]);
        expect(wrap([[]])).toStrictEqual([[]]);
    });

    it('should wrap falsy values', () => {
        [false, '', 0, null, undefined].forEach(val => {
            expect(wrap(val)).toStrictEqual([val]);
        });
    });

    it('should return an empty array if no argument given', () => {
        expect(wrap()).toStrictEqual([]);
    });
});
