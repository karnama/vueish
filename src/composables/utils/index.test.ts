import { createFileList, getExtension, getSizeString, isImage } from './index';

describe('utils', () => {
    describe('isImage', () => {
        it('should correctly determine the image based on the extension', () => {
            expect(isImage(new File([''], 'text.txt'))).toBe(false);

            expect(isImage(new File([''], 'img.jpeg'))).toBe(true);
            expect(isImage(new File([''], 'img.jpg'))).toBe(true);
            expect(isImage(new File([''], 'img.png'))).toBe(true);
            expect(isImage(new File([''], 'img.gif'))).toBe(true);
        });
    });

    describe('getExtension', () => {
        it('should correctly determine the extension', () => {
            expect(getExtension(new File([''], 'text.txt'))).toBe('txt');
            expect(getExtension(new File([''], 'text.pdf'))).toBe('pdf');
        });
    });

    describe('createFileList', () => {
        // jsdom does not support it
        it('should throw an error if browser is not supporting the DataTransfer or ClipboardEvent', () => {
            expect(() => createFileList(new File([''], 'text.txt')))
                .toThrow(new Error('Unsupported browser:\nReferenceError: ClipboardEvent is not defined'));
        });
    });

    describe('getSizeString', () => {
        it('should correctly determine the correct suffix', () => {
            expect(getSizeString(new File(['content'], 'text.txt'))).toBe('7B');
            expect(getSizeString(new File([new Array(1000).join('1')], 'text.txt'))).toBe('0.98KB');
            expect(getSizeString(new File([new Array(1000000).join('1')], 'text.txt'))).toBe('0.95MB');
        });
    });
});
