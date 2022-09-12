/**
 * Generate tailwind css colours vars from the given hex colours.
 */
type RGBObject = { r: number; g: number; b: number };
type Level = 50 | 100 | 200 | 300 | 400 | 500 |600 | 700 | 800 | 900;

const hexToRgb = (hex: string): RGBObject | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

/* eslint-disable @typescript-eslint/naming-convention */
const colors: Record<Level, string> = {
    50: '#FEC2A5',
    100: '#FDB691',
    200: '#FDA068',
    300: '#FC8D40',
    400: '#FB7B18',
    500: '#E76E04',
    600: '#BA5E03',
    700: '#8D4B02',
    800: '#5F3601',
    900: '#321E01'
};
/* eslint-enable @typescript-eslint/naming-convention */

const cssVars = Object.keys(colors).map(num => {
    const level = num as unknown as Level;
    const rbgObj = hexToRgb(colors[level]) as RGBObject & { level: Level };
    rbgObj.level = level;

    return rbgObj;
})
    .map(obj => {
        return `--color-brand-${obj.level}: ${obj.r}, ${obj.g}, ${obj.b};`;
    })
    .join('\n');

// eslint-disable-next-line no-console
console.log(cssVars);

export {};
