export const isString = (value: any): value is string => typeof value === 'string';
export const isNumber = (value: any): value is number => typeof value === 'number';
export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';

/**
 * Get the file size denoted by unit.
 */
export const getSizeString = (file: File): string => {
    if (file.size < 1024) {
        return file.size.toPrecision(2) + ' B';
    }

    const sizeInMb = file.size / 1024 / 1024;

    if (sizeInMb < 0.1) {
        return (sizeInMb * 1024).toPrecision(2) + ' KB';
    }

    if (sizeInMb < 100) {
        return sizeInMb.toPrecision(2) + ' MB';
    }

    return (sizeInMb / 1024).toPrecision(2) + ' GB';
};

/**
 * Create an instance of FileList.
 */
export const createFileList = (files: File | File[]): FileList => {
    try {
        const dataTransfer = new ClipboardEvent('').clipboardData ?? new DataTransfer();

        (Array.isArray(files) ? files : [files]).forEach(file => {
            dataTransfer.items.add(file);
        });

        return dataTransfer.files;
    } catch (e: unknown) {
        throw new Error('Unsupported browser:\n' + String(e));
    }
};

/**
 * Determine whether the given file is an image.
 */
export const isImage = (file: File): boolean => {
    return !!RegExp(/[/.](gif|jp(e)?g|png)$/).exec(file.name.toLowerCase());
};

/**
 * Get the extension of the given file.
 */
export const getExtension = (file: File): string | null => {
    const regexpArr = RegExp(/(?:\.([^.]+))?$/).exec(file.name.toLowerCase());

    return regexpArr ? regexpArr[1] : null;
};
