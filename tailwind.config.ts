import { TailwindConfig } from 'tailwindcss/tailwind-config';

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

// todo - brand colors do not transpile correctly
const brandColor = (level: number) => {
    return function({ opacityVariable, opacityValue }: { opacityVariable: string; opacityValue: string | number }) {
        if (opacityValue) {
            return `rgba(var(--color-brand-${level}), ${opacityValue})`;
        }
        if (opacityVariable) {
            return `rgba(var(--color-brand-${level}), var(${opacityVariable}, 1))`;
        }
        return `rgb(var(--color-brand-${level}))`;
    };
};

const brandColors = (levels: number[]) => {
    const colors: Record<string, CallableFunction> = {};

    levels.forEach(level => colors['brand-' + String(level)] = brandColor(level));

    return colors;
};

export default {
    purge: ['./src/**/*.{vue,ts,tsx}'],
    darkMode: 'class',
    mode: 'jit',
    theme: {
        borderColor: (theme: any) => ({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            ...theme('colors'),
            // eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-unsafe-call
            DEFAULT: theme('colors.gray.400', 'currentColor')
        }),
        extend: {
            colors: {
                ...brandColors([50, 100, 200, 300, 400, 500, 600, 700, 800, 900])
            },
            transitionProperty: {
                'spacing': 'margin, padding'
            },
            rotate: {
                '270': '270deg'
            }
        }
    }
} as unknown as DeepPartial<TailwindConfig>;
