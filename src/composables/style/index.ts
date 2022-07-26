/**
 * Convert numbers and vh/vw/rem values to px values.
 */
export const getPxValue = (value: string | number): number => {
    if (typeof value === 'number') {
        return value;
    }

    if (!isNaN(Number(value))) {
        return Number(value);
    }

    if (value.endsWith('px')) {
        return Number(value.slice(0, -2));
    }

    if (value.endsWith('vw')) {
        return globalThis?.document.documentElement.clientWidth / 100 * Number(value.slice(0, -2));
    }

    if (value.endsWith('vh')) {
        return globalThis?.document.documentElement.clientHeight / 100 * Number(value.slice(0, -2));
    }

    if (value.endsWith('rem')) {
        return Number(value.slice(0, -3))
            *
            parseFloat(globalThis?.window.getComputedStyle(globalThis?.document.documentElement).fontSize);
    }

    throw new TypeError('Unexpected argument given. Expected a number, px/vh/vw/rem value, got: ' + value);
};
