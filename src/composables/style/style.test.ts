import { getPxValue } from '@composables/style/index';

describe('style', () => {
    describe('getPxValue', () => {
        let clientHeightSpy: jest.SpyInstance<number, []>;
        let clientWidthSpy: jest.SpyInstance<number, []>;
        beforeAll(() => {
            clientHeightSpy = jest
                .spyOn(document.documentElement, 'clientHeight', 'get')
                .mockImplementation(() => 100);
            clientWidthSpy = jest
                .spyOn(document.documentElement, 'clientWidth', 'get')
                .mockImplementation(() => 100);
        });

        afterAll(() => {
            clientHeightSpy.mockRestore();
            clientWidthSpy.mockRestore();
        });

        it('should return a number on px value argument', () => {
            expect(getPxValue('5px')).toBe(5);
        });

        it('should return a number on number argument', () => {
            expect(getPxValue(5)).toBe(5);
            expect(getPxValue('5')).toBe(5);
        });

        it('should throw an error on invalid argument', () => {
            expect(() => getPxValue('something')).toThrow(new TypeError('Unexpected argument given.'));
        });

        it('should correctly convert vw to px', () => {
            expect(getPxValue('1vw')).toBe(1);
        });

        it('should correctly convert vh to px', () => {
            expect(getPxValue('1vh')).toBe(1);
        });

        it('should correctly convert rem to px', () => {
            const style = document.createElement('style');
            document.head.appendChild(style);
            style.sheet!.insertRule('html { font-size: 16px; }');

            expect(getPxValue('1rem')).toBe(16);

            document.head.removeChild(style);
        });
    });
});
