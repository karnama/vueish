const brandColor = (
    level
) => {
    return function({ opacityVariable, opacityValue }) {
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

module.exports = {
    purge: ['./index.html', './src/**/*.{vue,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                ...brandColors([50, 100, 200, 300, 400, 500, 600, 700, 800, 900])
            }
        }
    },
    variants: {
        extend: {
            backgroundColor: ['active']
        }
    }
};
