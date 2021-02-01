/* eslint-disable no-console, jest/prefer-spy-on */
import LocalCache from './LocalCache';

let cache: LocalCache;
const namespace = 'testing_';
const consoleError = console.error;

describe('Cache', () => {
    beforeEach(() => {
        cache = new LocalCache(namespace.slice(0, namespace.length - 1));
        localStorage.clear();
    });

    describe('constructor()', () => {
        it('should accept a value for the namespace', () => {
            cache.set('item', 1);
            expect(localStorage.key(0)).toBe(namespace + 'item');
        });
    });

    describe('.namespace', () => {
        it('should validate when setting the namespace value', () => {
            // @ts-expect-error
            const failingFunc = jest.fn(() => cache.namespace = 1);

            expect(failingFunc).toThrow(
                new Error('Invalid type for namespace. Expected string got number')
            );
        });
    });

    describe('get()', () => {
        it('should get the value from localStorage', () => {
            expect(cache.set('item', 1).get('item')).toBe(1);
        });

        it('should log an error if localStorage value is corrupted', () => {
            // eslint-disable-next-line jest/prefer-spy-on
            console.error = jest.fn();
            cache.set('item', {});
            localStorage.setItem(namespace + 'item', '{');
            cache.get('item');

            expect(console.error)
                .toHaveBeenCalledWith('"item" cannot be parsed to a Javascript type: \n{');

            console.error = consoleError;

        });

        it('should remove value if localStorage value is corrupted', () => {
            console.error = jest.fn();
            cache.set('item', {});
            localStorage.setItem(namespace + 'item', '{');
            cache.get('item');

            expect(localStorage.getItem(namespace + 'item')).toBeNull();
            console.error = consoleError;
        });

        it('should return the given default value if localStorage value is not defined', () => {
            expect(cache.get('undefinedKey', 1)).toBe(1);
        });
    });

    describe('set()', () => {
        it('should set the given value in the localStorage prefixed by the namespace', () => {
            cache.set('item', 1);
            expect(localStorage.getItem(namespace + 'item')).not.toBeNull();
        });
    });

    describe('add()', () => {
        it('should merge in objects', () => {
            const object = {
                nested: {
                    value: 1
                }
            };
            cache.set('item', object);
            object.nested.value++;

            expect(cache.get('item')).not.toStrictEqual(object);
            expect(cache.add('item', object).get('item')).toStrictEqual(object);
        });

        it('should default to js\'s type coercion', () => {
            expect(cache.set('item', 1).add('item', '2').get('item')).toBe('12');
        });

        it('should push the values into the array if item initially is an array', () => {
            cache.set('item', []).add('item', 1);
            expect(cache.get('item')).toStrictEqual([1]);

            cache.add('item', [2]);
            expect(cache.get('item')).toStrictEqual([1, 2]);
        });
    });

    describe('remove()', () => {
        it('should remove the given key from localStorage', () => {
            cache.set('item', 1).remove('item');
            expect(localStorage.getItem(namespace + 'item')).toBeNull();
        });
    });

    describe('has', () => {
        it('should correctly determine if a key exists in storage', () => {
            expect(cache.has('item')).toBe(false);
            expect(cache.set('item', 1).has('item')).toBe(true);
        });

        it('should remove the key if corrupted and return false', () => {
            console.error = jest.fn();
            localStorage.setItem(namespace + 'item', '{');
            cache.has('item');

            expect(localStorage.getItem(namespace + 'item')).toBeNull();
            console.error = consoleError;
        });
    });
});
