module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            borderRadius: {
                default: '2px'
            },
            textColor: {
                'default': 'var(--color-text)',
                'strong': 'var(--color-text-strong)',
                'muted': 'var(--color-text-muted)',

                'brand': 'var(--color-brand)',
                'brand-light': 'var(--color-brand-light)',
                'brand-dark': 'var(--color-brand-dark)',

                'primary': 'var(--color-primary)',
                'primary-light': 'var(--color-primary-light)',
                'primary-dark': 'var(--color-primary-dark)',

                'success': 'var(--color-success)',
                'success-light': 'var(--color-success-light)',
                'success-dark': 'var(--color-success-dark)',

                'info': 'var(--color-info)',
                'info-light': 'var(--color-info-light)',
                'info-dark': 'var(--color-info-dark)',

                'warning': 'var(--color-warning)',
                'warning-light': 'var(--color-warning-light)',
                'warning-dark': 'var(--color-warning-dark)',

                'danger': 'var(--color-danger)',
                'danger-light': 'var(--color-danger-light)',
                'danger-dark': 'var(--color-danger-dark)'
            },
            backgroundColor: {
                'default': 'var(--color-bg)',
                'dark': 'var(--color-bg-dark)',
                'darker': 'var(--color-bg-darker)',
                'light': 'var(--color-bg-light)',
                'lighter': 'var(--color-bg-lighter)',

                'brand': 'var(--color-brand)',
                'brand-light': 'var(--color-brand-light)',
                'brand-dark': 'var(--color-brand-dark)',

                'primary': 'var(--color-primary)',
                'primary-light': 'var(--color-primary-light)',
                'primary-dark': 'var(--color-primary-dark)',

                'success': 'var(--color-success)',
                'success-light': 'var(--color-success-light)',
                'success-dark': 'var(--color-success-dark)',

                'info': 'var(--color-info)',
                'info-light': 'var(--color-info-light)',
                'info-dark': 'var(--color-info-dark)',

                'warning': 'var(--color-warning)',
                'warning-light': 'var(--color-warning-light)',
                'warning-dark': 'var(--color-warning-dark)',

                'danger': 'var(--color-danger)',
                'danger-light': 'var(--color-danger-light)',
                'danger-dark': 'var(--color-danger-dark)'
            },
            borderColor: {
                default: 'var(--color-border)',

                'brand': 'var(--color-brand)',
                'brand-light': 'var(--color-brand-light)',
                'brand-dark': 'var(--color-brand-dark)',

                'primary': 'var(--color-primary)',
                'primary-light': 'var(--color-primary-light)',
                'primary-dark': 'var(--color-primary-dark)',

                'success': 'var(--color-success)',
                'success-light': 'var(--color-success-light)',
                'success-dark': 'var(--color-success-dark)',

                'info': 'var(--color-info)',
                'info-light': 'var(--color-info-light)',
                'info-dark': 'var(--color-info-dark)',

                'warning': 'var(--color-warning)',
                'warning-light': 'var(--color-warning-light)',
                'warning-dark': 'var(--color-warning-dark)',

                'danger': 'var(--color-danger)',
                'danger-light': 'var(--color-danger-light)',
                'danger-dark': 'var(--color-danger-dark)'
            }
        },
        letterSpacing: {
            tightest: '-.005em',
            tighter: '-.05em',
            tight: '-.025em',
            normal: '0',
            wide: '.05em',
            wider: '.1em',
            widest: '.2em'
        },
        flex: {
            auto: '1 1 auto',
            initial: '0 1 auto',
            inherit: 'inherit',
            none: 'none',
            '1': '1 1 0%',
            '2': '2 2 0%',
            '3': '3 3 0%',
            '4': '4 4 0%',
            '5': '5 5 0%'
        }
    },
    plugins: [],
    variants:
        {
            opacity: ['hover', 'responsive', 'focus', 'disabled', 'group-hover'],
            textColor: ['hover', 'focus', 'group-hover'],
            backgroundColors: ['hover', 'focus', 'group-hover'],
            borderColor: ['hover', 'focus'],
            boxShadow: ['hover', 'focus'],
            fontWeight: ['hover', 'focus'],
            textDecoration: ['hover', 'focus']
        }
};
