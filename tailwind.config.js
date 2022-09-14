const brandColor = (level) => {
    return function ({opacityVariable, opacityValue}) {
        if (opacityValue) {
            return `rgba(var(--color-brand-${level}), ${opacityValue})`;
        }
        if (opacityVariable) {
            return `rgba(var(--color-brand-${level}), var(${opacityVariable}, 1))`;
        }
        return `rgb(var(--color-brand-${level}))`;
    };
};

const brandColors = (levels) => {
    const colors = {};

    levels.forEach(level => colors['brand-' + String(level)] = brandColor(level));

    return colors;
};

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
    content: ['./src/**/*.{vue,ts,tsx}'],
    darkMode: 'class',
    theme: {
        borderColor: theme => ({
            ...theme('colors'),
            DEFAULT: theme('colors.gray.400', 'currentColor')
        }),
        extend: {
            colors: {
                ...brandColors([50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
                gray: {
                    250: '#DBDEE3',
                    450: '#848B98',
                    650: '#414B5A',
                    750: '#2B3544',
                    850: '#242D3C'
                }
            },
            transitionProperty: {
                'spacing': 'margin, padding'
            },
            rotate: {
                '270': '270deg',
            },
            minHeight: (theme) => ({
                ...theme('height')
            })
        }
    }
};

if (process.env.NODE_ENV === 'production') {
    tailwindConfig.content.push('!./src/**/Demo*.vue')
}

module.exports = tailwindConfig;
