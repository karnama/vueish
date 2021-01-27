module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // The below retains opacity functionality when using brand colors.
                // eg 'bg-brand-400 bg-opacity-10'
                'brand-50': ({opacityVariable, opacityValue}) => {
                    if (opacityValue !== undefined) {
                        return `rgba(var(--color-brand-50), ${opacityValue})`;
                    }
                    if (opacityVariable !== undefined) {
                        return `rgba(var(--color-brand-50), var(${opacityVariable}, 1))`;
                    }
                    return `rgb(var(--color-brand-50))`;
                },
                'brand-100': ({opacityVariable, opacityValue}) => {
                    if (opacityValue !== undefined) {
                        return `rgba(var(--color-brand-100), ${opacityValue})`;
                    }
                    if (opacityVariable !== undefined) {
                        return `rgba(var(--color-brand-100), var(${opacityVariable}, 1))`;
                    }
                    return `rgb(var(--color-brand-100))`;
                },
                'brand-200': ({opacityVariable, opacityValue}) => {
                    if (opacityValue !== undefined) {
                        return `rgba(var(--color-brand-200), ${opacityValue})`;
                    }
                    if (opacityVariable !== undefined) {
                        return `rgba(var(--color-brand-200), var(${opacityVariable}, 1))`;
                    }
                    return `rgb(var(--color-brand-200))`;
                },
                'brand-300': ({opacityVariable, opacityValue}) => {
                    if (opacityValue !== undefined) {
                        return `rgba(var(--color-brand-300), ${opacityValue})`;
                    }
                    if (opacityVariable !== undefined) {
                        return `rgba(var(--color-brand-300), var(${opacityVariable}, 1))`;
                    }
                    return `rgb(var(--color-brand-300))`;
                },
                'brand-400': ({opacityVariable, opacityValue}) => {
                    if (opacityValue !== undefined) {
                        return `rgba(var(--color-brand-400), ${opacityValue})`;
                    }
                    if (opacityVariable !== undefined) {
                        return `rgba(var(--color-brand-400), var(${opacityVariable}, 1))`;
                    }
                    return `rgb(var(--color-brand-400))`;
                },
                'brand-500': ({opacityVariable, opacityValue}) => {
                    if (opacityValue !== undefined) {
                        return `rgba(var(--color-brand-500), ${opacityValue})`;
                    }
                    if (opacityVariable !== undefined) {
                        return `rgba(var(--color-brand-500), var(${opacityVariable}, 1))`;
                    }
                    return `rgb(var(--color-brand-500))`;
                },
                'brand-600': ({opacityVariable, opacityValue}) => {
                    if (opacityValue !== undefined) {
                        return `rgba(var(--color-brand-600), ${opacityValue})`;
                    }
                    if (opacityVariable !== undefined) {
                        return `rgba(var(--color-brand-600), var(${opacityVariable}, 1))`;
                    }
                    return `rgb(var(--color-brand-600))`;
                },
                'brand-700': ({opacityVariable, opacityValue}) => {
                    if (opacityValue !== undefined) {
                        return `rgba(var(--color-brand-700), ${opacityValue})`;
                    }
                    if (opacityVariable !== undefined) {
                        return `rgba(var(--color-brand-700), var(${opacityVariable}, 1))`;
                    }
                    return `rgb(var(--color-brand-700))`;
                },
                'brand-800': ({opacityVariable, opacityValue}) => {
                    if (opacityValue !== undefined) {
                        return `rgba(var(--color-brand-800), ${opacityValue})`;
                    }
                    if (opacityVariable !== undefined) {
                        return `rgba(var(--color-brand-800), var(${opacityVariable}, 1))`;
                    }
                    return `rgb(var(--color-brand-800))`;
                },
                'brand-900': ({opacityVariable, opacityValue}) => {
                    if (opacityValue !== undefined) {
                        return `rgba(var(--color-brand-900), ${opacityValue})`;
                    }
                    if (opacityVariable !== undefined) {
                        return `rgba(var(--color-brand-900), var(${opacityVariable}, 1))`;
                    }
                    return `rgb(var(--color-brand-900))`;
                }
            }
        }
    },
    variants: {
        extend: {
            backgroundColor: ['disabled'],
            opacity: ['disabled'],
            cursor: ['disabled'],
            backgroundOpacity: ['disabled']
        }
    }
};
